import React from "react";
import Security from "../../../security/Security";
import BackToProfileMobile from "../../common/BackToProfileMobile";
import Globals from "../../../util/Globals";
import ProfilePic from "../../../pcComponents/common/ProfilePic";
import UserFullName from "../../../pcComponents/common/UserFullName";

const axios = require('axios');


class ReferenceCodesMobile extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            me: {},
            references: [],
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {

        const self = this;

        axios.get(Globals.serviceUrl + 'user/profile/' + localStorage.getItem("userId"))
            .then(function (response) {
                self.setState({me: response.data});
            });
        axios.get(Globals.serviceUrl + 'reference/myReferences', Security.authHeader())
            .then(function (response) {
                self.setState({references: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    render() {
        const self = this;
        return (
            <div className="full-width container">
                <BackToProfileMobile/>
                <h5>Arkadaşlarına vermen gereken referans kodu :{this.state.me.referenceCode}</h5>
                <hr/>

                <h4>Referans olduğum kişiler</h4>
                <hr/>

                {
                    self.state.references.map(function (reference, i) {
                        return (
                            <div className={"row"}>
                                <div className={"float-left"}>
                                    <ProfilePic
                                        profilePicName={reference.profilePicName}
                                        userId={reference.id}
                                        cssClass={"profilePicSmall"}
                                    />
                                </div>
                                <div className={"float-left"}>
                                    <br/>
                                    <UserFullName
                                        user={reference}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default ReferenceCodesMobile;