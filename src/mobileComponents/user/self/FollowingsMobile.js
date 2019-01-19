import React from "react";
import Security from "../../../security/Security";
import ProfilePicMobile from "../../common/ProfilePicMobile";
import UserFullNameMobile from "../../common/UserFullNameMobile";
import JSUtil from "../../../util/JSUtil";
import BackToProfileMobile from "../../common/BackToProfileMobile";

const axios = require('axios');


class FollowingsMobile extends React.Component {
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
        axios.get('http://localhost:8080/follow/myFollowings', Security.authHeader())
            .then(function (response) {
                self.setState({followings: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    unfollow(id, name) {
        const self = this;

        if (window.confirm("Artık " + name + " ile ilgili bildirim almayacaksınız, emin misiniz?"))
            axios.get('http://localhost:8080/follow/follow/' + id, Security.authHeader())
                .then(function (response) {

                    let followings = self.state.followings;
                    JSUtil.deleteFromArrayByPropertyName(followings, "id", id);
                    self.setState({blocks: followings});
                })
                .catch(function (error) {
                });
    }


    render() {
        const self = this;
        return (
            <div className="full-width container">
                <BackToProfileMobile/>
                <h5>Bildirim Aldığım kişiler</h5>
                {
                    self.state.followings.map(function (following, i) {
                        return (
                            <div className={"full-width"}>
                                <div className={"half-left"}>
                                    <ProfilePicMobile
                                        userId={following.id}
                                        profilePicName={following.profilePicName}
                                        cssClass={"profilePicSmall"}
                                    />
                                    <br/>
                                    <UserFullNameMobile
                                        userId={following.id}
                                        name={following.name}
                                        surname={following.surname}
                                    />
                                </div>
                                <div className={"half-left"}><br/>
                                    <button onClick={() => self.unfollow(following.id, following.name)}
                                            className={"btn btn-danger"}>Bildirim almayı Bırak
                                    </button>
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

export default FollowingsMobile;