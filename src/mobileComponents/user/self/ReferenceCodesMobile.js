import React from "react";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";
import ProfilePic from "../../../pcComponents/common/ProfilePic";
import UserFullName from "../../../pcComponents/common/UserFullName";
import ProfilePicMobile from "../../common/ProfilePicMobile";

const axios = require('axios');


class ReferenceCodesMobile extends React.Component {
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
                <h6>Şu an erkek alımlarını referans sadece referans ile yapıyoruz, kadınlar ise referans ile veya
                    referans olmadan da üye olabiliyor.
                </h6>
                <h6>
                    Referans ile üye olan kadınlara üye oldukları an 5 puan veriliyor. Ayrıca senin referansın ile üye
                    olmuş bir kadın 10 puana ulaşırsa sana da 10 puan ekliyoruz.
                </h6>
                <hr/>
                <span>Kadınlara vermen gereken refereans kodu<br/>(Değişmez) </span>
                <h6><strong>{localStorage.getItem("userId")}</strong></h6>
                <hr/>
                <span>Erkeklere vermen gereken refereans kodu<br/>(Her defasında değişir) </span>
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
                                    <ProfilePicMobile
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