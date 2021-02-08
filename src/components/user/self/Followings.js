import React from "react";
import Security from "../../../security/Security";
import ProfilePic from "../../common/ProfilePic";
import UserFullName from "../../common/UserFullName";
import JSUtil from "../../../util/JSUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');


class Followings extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            followings: [],
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl+'follow/myFollowings', Security.authHeader())
            .then(function (response) {
                self.setState({followings: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    unfollow(id, name,followId) {
        const self = this;

        if (window.confirm("Artık " + name + " ile ilgili bildirim almayacaksınız, emin misiniz?"))
            axios.get(Globals.serviceUrl+'follow/follow/' + id, Security.authHeader())
                .then(function (response) {

                    let followings = self.state.followings;
                    JSUtil.deleteFromArrayByPropertyName(followings, "id", followId);
                    self.setState({blocks: followings});
                })
                .catch(function (error) {
                });
    }


    render() {
        const self = this;
        return (
            <div className="full-width container">
                <h5>Takip Ettiğim Kişiler</h5>
                {
                    self.state.followings.map(function (following, i) {
                        return (
                            <div className={"full-width"}>
                                <div className={"half-left"}>
                                    <ProfilePic
                                        userId={following.profileDto.id}
                                        profilePicName={following.profileDto.profilePicName}
                                        cssClass={"profilePicSmallMobile"}
                                    />
                                    <br/>
                                    <UserFullName
                                        user={following.profileDto}
                                    />
                                </div>
                                <div className={"half-left"}>
                                    {following.status==="WAITING" &&(
                                        <div className={"btn btn-success"} onClick= {() => self.unfollow(following.profileDto.id, following.profileDto.name,following.id)}>requested</div>
                                    )}
                                    {following.status==="APPROVED" &&(
                                        <div className={"btn btn-success"} onClick={()=>self.unfollow(following.profileDto.id,following.profileDto.name,following.id)}>unfollow</div>
                                    )}
                                </div>
                                <div className={"clear-both"}/>
                                <hr/>

                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default Followings;