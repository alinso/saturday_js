import React from "react";

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

        axios.get('http://localhost:8080/user/search/'+ searchTerm)
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


    onChange(e) {
        this.setState({"searchText": e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.searchUser(this.state.searchText);
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
                                value={this.state.newPassword}
                                onChange={this.onChange}
                                required
                            />
                            <input
                                type="submit" value="Kullanıcı Ara"
                                className="btn btn-primary btn-block mt-4"
                            />
                        </div>
                    </form>
                    {userNotFoundMessage &&(
                        <h6>{userNotFoundMessage}</h6>
                    )}

                    {self.state.users.map((user, i) => {

                        if(user.profilePicName)
                            profilePicUrl =  "/upload/profile/" +user.profilePicName;
                        else
                             profilePicUrl="/user.png";

                        return (<div className="row">
                        <div className="col-md-4">
                            <img className="userListProfile" src={profilePicUrl} />
                        </div>
                            <div className="col-md-8">
                                <h6>{user.name +" "+user.surname} </h6>
                            </div>
                        </div>)
                    })}

                </div>
            </div>

        )
    }
}

export default SearchUser;