import React from "react";
import UserUtil from "../../../util/UserUtil";

const axios = require('axios');


class SearchUser extends React.Component {
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

        axios.get('http://localhost:8080/user/search/' + searchTerm)
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
            <div className="row">
                <div className="col-md-8 m-auto">
                    <hr/>
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

                        profilePicUrl=UserUtil.buildProfilePicUrl(user.profilePicName);


                        return (<div className="row searchItemContainer">
                            <div className="col-md-2">
                                <a href={"/profile/" + user.id}>
                                    <img className="userListProfile" src={profilePicUrl}/>
                                </a>
                            </div>
                            <div className="col-md-5">
                                <a className="searchItem" href={"/profile/" + user.id}>
                                    <h4>{user.name + " " + user.surname}</h4></a>
                                <h5>{user.gender} / {user.age}</h5>
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i
                                className="fas fa-star"></i><i className="fas fa-star"></i><i
                                className="fas fa-star"></i>(37)
                            </div>
                        </div>)
                    })}

                </div>
            </div>

        )
    }
}

export default SearchUser;