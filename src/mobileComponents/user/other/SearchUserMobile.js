import React from "react";
import UserUtil from "../../../util/UserUtil";
import ProfilePicMobile from "../../common/ProfilePicMobile";
import UserFullNameMobile from "../../common/UserFullNameMobile";
import BackToProfileMobile from "../../common/BackToProfileMobile";
import Globals from "../../../util/Globals";

const axios = require('axios');


class SearchUserMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            userNotFoundMessage: false,
            users: [],
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }


    searchUser(searchTerm) {
        let self = this;

        axios.get(Globals.serviceUrl+'user/search/' + searchTerm)
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
        this.setState({"searchText": e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.searchUser(this.state.searchText);
    }

    componentDidMount() {
        let url = this.props.location.search;
        if (url) {
            let fullname = url.split("fullname=")[1];
            fullname = fullname.replace("+", " ");
            this.searchFromUrlQuery(fullname);
        }
    }

    render() {

        const {userNotFoundMessage} = this.state;
        const self = this;
        let profilePicUrl;

        return (
            <div className="full-width container">
                <BackToProfileMobile/>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="İsim Giriniz"
                            name="searchText"
                            value={this.state.searchText}
                            onChange={this.onChange}
                            required
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
                                userId={user.id}
                                name={user.name}
                                surname={user.surname}
                            />
                        </div>
                        <div className={"half-left"}>
                            <h5>{UserUtil.translateGender(user.gender)} / {user.age}</h5>
                            <h4>{user.point} <i className="far fa-star"/></h4>
                        </div>
                        <div className={"clear-both"}/>
                    </div>)
                })}

            </div>

        )
    }
}

export default SearchUserMobile;