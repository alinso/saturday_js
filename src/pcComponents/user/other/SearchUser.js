import React from "react";
import UserUtil from "../../../util/UserUtil";
import ProfilePic from "../../common/ProfilePic";
import UserFullName from "../../common/UserFullName";
import Globals from "../../../util/Globals";
import classnames from "classnames";
import Security from "../../../security/Security";

const axios = require('axios');


class SearchUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            userNotFoundMessage: false,
            type: "NAME",
            pageNum: 0,
            noMoreRecords: false,
            users: [],
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadMore= this.loadMore.bind(this);
        let self = this;
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                self.loadMore();
            }
        };

    }

    loadMore() {
        const self = this;
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});


        let searchText = this.state.searchText;
        searchText = searchText.replace(" ","");

        if (this.state.type === "NAME")
            axios.get(Globals.serviceUrl + 'user/search/' + this.state.searchText +"/"+ newPageNum)
                .then(function (response) {
                    if (response.data.length === 0) {
                        self.setState({noMoreRecords: true});
                        return;
                    }
                    let newUsers = self.state.users;
                    newUsers = newUsers.concat(response.data);
                    console.log(newUsers);
                    self.setState({"users": newUsers});
                });


        if (this.state.type === "HASHTAG")
            axios.get(Globals.serviceUrl + 'hashtag/findUsers/' +  this.state.searchText +"/"+ newPageNum)
                .then(function (response) {
                    if (response.data.length === 0) {
                        self.setState({noMoreRecords: true});
                        return;
                    }
                    let newUsers = self.state.users;
                    newUsers = newUsers.concat(response.data);
                    self.setState({"users": newUsers});
                    console.log(this.state.users);
                });

    }

    searchUser(searchTerm) {
        let self = this;

        searchTerm = searchTerm.replace(" ","");


        if (this.state.type === "NAME")
            axios.get(Globals.serviceUrl + 'user/search/' + searchTerm + "/" + this.state.pageNum)
                .then(function (response) {
                    self.setState({"userNotFoundMessage": false});
                    self.setState({"users": response.data});

                    if (response.data.length === 0)
                        self.setState({"userNotFoundMessage": "Kullanıcı Bulunamadı"});

                })
                .catch(function (error) {
                    console.log(error.response);
                });

        if (this.state.type === "HASHTAG")
            axios.get(Globals.serviceUrl + 'hashtag/findUsers/' + searchTerm + "/" + this.state.pageNum)
                .then(function (response) {

                    self.setState({"userNotFoundMessage": false});
                    self.setState({"users": response.data});
                    if (response.data.length === 0)
                        self.setState({"userNotFoundMessage": "Kullanıcı Bulunamadı"});

                     })
                .catch(function (error) {
                    console.log(error.response);
                });
    }

    searchFromUrlQuery(searchText) {
        this.setState({"searchText": searchText});
        this.searchUser(searchText);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.searchUser(this.state.searchText);
    }

    componentDidMount() {
        let urlQUery = this.props.location.search;
        let fullname = urlQUery.split("fullname=")[1];
        let hashtag = urlQUery.split("hashtag=")[1];


        if (fullname) {
            fullname = fullname.replace("+", " ");
            this.state.type = "NAME";
            this.searchFromUrlQuery(fullname);
        }
        if (hashtag) {
            this.state.type = "HASHTAG";
            this.searchFromUrlQuery(hashtag);
        }
    }

    render() {

        const {userNotFoundMessage} = this.state;
        const self = this;


        return (
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">
                    <hr/>
                    <form onSubmit={this.onSubmit}>
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <div className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Ara..."
                                        name="searchText"
                                        value={this.state.searchText}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={"col-md-4 m-auto"}>
                                <label>İsim&nbsp;</label>
                                <input type="radio"
                                       name="type"
                                       value="NAME"
                                       className={"customRadio"}
                                       onChange={this.onChange}
                                       checked={this.state.type === "NAME"}
                                />&nbsp;&nbsp;&nbsp;&nbsp;

                                <label>Hashtag&nbsp;</label>
                                <input type="radio"
                                       name="type"
                                       className={"customRadio"}
                                       onChange={this.onChange}
                                       value="HASHTAG"
                                       checked={this.state.type === "HASHTAG"}
                                />
                            </div>
                            <div className={"col-md-4 m-auto"}>
                                <input
                                    type="submit" value="Kullanıcı Ara"
                                    className="btn btn-primary btn-block"
                                />
                            </div>
                        </div>
                    </form>
                    <hr/>
                    {userNotFoundMessage && (
                        <h6>{userNotFoundMessage}</h6>
                    )}

                    {self.state.users.map((user, i) => {

                        return (<div className="row searchItemContainer">
                            <div className="col-md-2">

                                <ProfilePic
                                    userId={user.id}
                                    profilePicName={user.profilePicName}
                                    cssClass={"profilePicMedium"}
                                />
                            </div>
                            <div className="col-md-5">
                                <UserFullName
                                    user={user}
                                />
                                <h5>{UserUtil.translateGender(user.gender)} / {user.age}</h5>
                                <h4>{user.point} <i className="far fa-star"/></h4>

                            </div>
                        </div>)
                    })}
                    <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                        fazla göster...
                    </button>
                </div>

            </div>

        )
    }
}

export default SearchUser;