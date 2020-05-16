import React from "react";
import UserUtil from "../../../util/UserUtil";
import ProfilePicMobile from "../../common/ProfilePicMobile";
import UserFullNameMobile from "../../common/UserFullNameMobile";
import Globals from "../../../util/Globals";

const axios = require('axios');


class SearchUserMobile extends React.Component {
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

        this.loadMore= this.loadMore.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            axios.get(Globals.serviceUrl + 'user/search/' + searchText +"/"+ newPageNum)
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
            axios.get(Globals.serviceUrl + 'hashtag/findUsers/' +  searchText +"/"+ newPageNum)
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
        searchTerm = searchTerm.replace(" ","");

        let self = this;
        if (this.state.type === "NAME")
            axios.get(Globals.serviceUrl + 'user/search/' + searchTerm + "/" + this.state.pageNum)
                .then(function (response) {
                    self.setState({"users": response.data});
                    self.setState({"userNotFoundMessage": false});

                    if (response.data.length === 0)
                        self.setState({"userNotFoundMessage": "Kullanıcı Bulunamadı"});

                })
                .catch(function (error) {
                    console.log(error.response);
                });

        if (this.state.type === "HASHTAG")
            axios.get(Globals.serviceUrl + 'hashtag/findUsers/' + searchTerm+"/"+this.state.pageNum)
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
            <div className="full-width container">
                <form onSubmit={this.onSubmit}>

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
                        <br/>
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
                        <input
                            type="submit" value="Kullanıcı Ara"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </div>
                </form>
                {userNotFoundMessage && (
                    <h6>{userNotFoundMessage}</h6>
                )}

                {self.state.users.map((user, i) => {

                    return (<div className="full-width searchItemContainer">
                        <div className="half-left">
                            <ProfilePicMobile
                                userId={user.id}
                                profilePicName={user.profilePicName}
                                cssClass={"profilePicSmallMobile"}
                            />
                            <br/>
                            <UserFullNameMobile
                                user={user}
                            />
                        </div>
                        <div className={"half-left"}>
                            <h5>{UserUtil.translateGender(user.gender)} / {user.age}</h5>
                            {/*<h4>{user.point} <i className="far fa-star"/></h4>*/}
                        </div>
                        <div className={"clear-both"}/>
                    </div>)
                })}
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>

            </div>

        )
    }
}

export default SearchUserMobile;