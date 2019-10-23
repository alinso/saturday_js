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