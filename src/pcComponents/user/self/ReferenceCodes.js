import React from "react";
import Security from "../../../security/Security";
import UserFullName from "../../common/UserFullName";
import Globals from "../../../util/Globals";
import ProfilePic from "../../common/ProfilePic";

const axios = require('axios');


class ReferenceCodes extends React.Component {
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
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">
                    <h5>Arkadaşlarına vermen gereken referans kodu :{this.state.me.referenceCode}</h5>
                    <hr/>

                    <h4>Referans olduğum kişiler</h4>
                    <hr/>
                    <div className={"row"}>
                        {
                            self.state.references.map(function (reference, i) {
                                    return (
                                        <div className={"col-md-6 col-sm-6"}>
                                            <div className={"row"}>
                                                <div className={"col-md-3"}>
                                                    <ProfilePic
                                                        profilePicName={reference.profilePicName}
                                                        userId={reference.id}
                                                        cssClass={"profilePicSmall"}
                                                    />
                                                </div>
                                                <div className={"col-md-8 text-align-left"}>
                                                    <br/>
                                                    <UserFullName
                                                        user={reference}
                                                    />
                                                </div>
                                            </div>
                                        </div>)
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ReferenceCodes;