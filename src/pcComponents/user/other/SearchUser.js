import React from "react";
import UserUtil from "../../../util/UserUtil";
import ProfilePic from "../../common/ProfilePic";
import UserFullName from "../../common/UserFullName";
import Globals from "../../../util/Globals";
import classnames from "classnames";

const axios = require('axios');


class SearchUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            userNotFoundMessage: false,
            type: "NAME",
            users: [],
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }


    searchUser(searchTerm) {
        let self = this;

        if (this.state.type === "NAME")
            axios.get(Globals.serviceUrl + 'user/search/' + searchTerm)
                .then(function (response) {
                    if (response.data.length === 0)
                        self.setState({"userNotFoundMessage": "Kullanıcı Bulunamadı"});
                    self.setState({"users": response.data});
                })
                .catch(function (error) {
                    console.log(error.response);
                });

        if (this.state.type === "HASHTAG")
            axios.get(Globals.serviceUrl + 'hashtag/findUsers/' + searchTerm)
                .then(function (response) {
                    if (response.data.length === 0)
                        self.setState({"userNotFoundMessage": "Kullanıcı Bulunamadı"});
                    self.setState({"users": response.data});
                    console.log(this.state.users);
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
                                    userId={user.id}
                                    name={user.name}
                                    surname={user.surname}
                                />
                                <h5>{UserUtil.translateGender(user.gender)} / {user.age}</h5>
                                <h4>{user.point} <i className="far fa-star"/></h4>

                            </div>
                        </div>)
                    })}

                </div>

            </div>

        )
    }
}

export default SearchUser;