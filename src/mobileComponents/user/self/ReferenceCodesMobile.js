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
                <h6>Artık erkek/kadın fark etmeksizin herkes yalnız referans kodu ile üye olabilecek
                </h6>
                <h6>
                    Ankara için 10.000 üye olduğunda tüm alımları durduracağız. Eskişehir'de ise 5.000 üye sonrası alımları
                    durduracağız. Arkadaşlarınızın üye olmak için acele etmesi gerekebilir.<br/>
                    Kadın üye sayısı erkek üye sayısının 4 katı olacak. Ankara için 8.000 kadın, 2.000 erkek kontenjanımız var. Eskişehir için 1000 erkek 4000 kadın  kontenjanımız var.
                    <br/>
                    Lütfen aktif, iletişim becerileri kuvvetli, sosyal insanlara referas ol, kadın oranını yüksek tutabilmemiz için özellikle kadınlara referans olmanı istiyoruz.<br/>
                    Teşekkürler
                </h6>
                <hr/>

                <span>İnsanlara vermen gereken refereans kodu<br/>(Her defasında değişir) </span>
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