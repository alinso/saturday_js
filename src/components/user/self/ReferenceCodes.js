import React from "react";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";
import ProfilePic from "../../../../cemetery/pcComponents/common/ProfilePic";
import UserFullName from "../../../../cemetery/pcComponents/common/UserFullName";
import ProfilePic from "../../common/ProfilePic";

const axios = require('axios');


class ReferenceCodes extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            myCode: "",
            references: [],
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {

        const self = this;

        axios.get(Globals.serviceUrl + 'reference/myReferenceCode/', Security.authHeader())
            .then(function (response) {
                self.setState({myCode: response.data});
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
                <h6>
                    Erkek üyeler için referans kodu yalnız instagram basvuruları ile veriliyor. Erkek adaylar instagram hesabımıza yazabilir.
                </h6>
                (instagram : activuss)
                <hr/>

                <span>Kadınlara vermen gereken refereans kodu<br/>(Her defasında değişir) </span>
                <h6><strong>{this.state.myCode}</strong></h6>
                <hr/>
                <br/><br/>
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

export default ReferenceCodes;