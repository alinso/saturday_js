import React from "react";
import Security from "../../../security/Security";
import UserFullNameMobile from "../../common/UserFullNameMobile";
import BlocksMobile from "./BlocksMobile";
import BackToProfileMobile from "../../common/BackToProfileMobile";
import Globals from "../../../util/Globals";

const axios = require('axios');


class ReferenceCodesMobile extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            references: [],
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl+'reference/myReferences', Security.authHeader())
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
                    <h5>Sisteme referanssız üye olunamıyor, siz de bu referans kodları ile başkalarının üye olmasını
                        sağlayabilirsiniz</h5>
                    <hr/>
                    <div className={"full-width"}>
                        <div className={"half-left"}>
                            Referans Kodu
                            <hr/>
                        </div>
                        <div className={"half-left"}>
                            Kullanım Durumu
                        <hr/>
                        </div>
                        <div className={"clear-both"}/>
                    </div>
                    {
                        self.state.references.map(function (reference, i) {
                            return (
                                <div className={"full-width"}>
                                    <div className={"half-left"}>
                                        <h4>{reference.referenceCode}</h4>
                                    </div>
                                    <div className={"half-left"}>
                                        {reference.child && (
                                            <UserFullNameMobile
                                                userId={reference.child.id}
                                                name={reference.child.name}
                                                surname={reference.child.surname}
                                            />)
                                        }
                                        {!reference.child && (
                                            <h4>Kullanılmamış</h4>)
                                        }
                                    </div>
                                    <div className={"clear-both"}/>
                                </div>
                            );
                        })
                    }
                </div>
        )
    }
}

export default ReferenceCodesMobile;