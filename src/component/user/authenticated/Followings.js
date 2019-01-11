import React from "react";
import Security from "../../../security/Security";
import ProfilePic from "../../common/ProfilePic";
import UserFullName from "../../common/UserFullName";
import JSUtil from "../../../util/JSUtil";
const axios = require('axios');


class Followings extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state={
            followings:[],
            erorrs:{}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/follow/myFollowings', Security.authHeader())
            .then(function (response) {
                self.setState({blocks: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    unfollow(id,name){
        const self  =this;

        if(window.confirm("Artık "+name+" ile ilgili bildirim almayacaksınız, emin misiniz?"))
        axios.get('http://localhost:8080/follow/follow/' + id, Security.authHeader())
            .then(function (response) {

                let followings = self.state.followings;
                JSUtil.deleteFromArrayByPropertyName(followings,"id",id);
                self.setState({blocks:followings});
            })
            .catch(function (error) {
            });
    }


    render() {
        const self = this;
        return (
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h5>Bildirim Aldığım kişiler</h5>
                    {
                        self.state.followings.map(function (following, i) {
                            return (
                                <div className={"row"}>
                                    <div className={"col-md-3 col-sm-3"}>
                                        <ProfilePic
                                        userId = {following.id}
                                        profilePicName={following.profilePicName}
                                        cssClass={"profilePicMedium"}
                                        />
                                    </div>
                                    <div className={"col-md-5 col-sm-5"}>
                                        <UserFullName
                                        userId={following.id}
                                        name={following.name}
                                        surname={following.surname}
                                        />
                                    </div>
                                    <div className={"col-md-3col-sm-3"}>
                                    <button onClick={()=>self.unfollow(following.id,following.name)} className={"btn btn-danger"}>Bildirim almayı Bırak</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Followings;