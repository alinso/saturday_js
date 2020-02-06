import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import ProfilePic from "../../pcComponents/common/ProfilePic";
import UserFullName from "../../pcComponents/common/UserFullName";
import UserUtil from "../../util/UserUtil";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";

const axios = require('axios');


class Professionals extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            profileDtos: [],
        };

        this.fillPage();
    }


    fillPage() {
        let self = this;
        axios.get(Globals.serviceUrl + 'premium/professionals', Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({profileDtos: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    render() {

        let self = this;
        return (
            <div className="full-width text-align-left container">
                <hr/>
                Bu liste Activuss içerisinde her biri alanında uzman, eğitim ve organizasyon düzenleyen arkadaşlarımızı gösteriyor. Tanıdığımız, bildiğimiz kişilerden oluşan bu ekibimizin etkinliklerine
                güvenle katılabilir, profillerini inceleyerek daha fazla bilgi edinebilirsin. Activuss "her aktivitende sana eşlik edecek insanlar bul" temelini kaybetmeden, kaliteli etkinliklerin-organizasyonaların
                da düzenlendiği, eğitimlerin de verildiği bir platform oluyor. Bu nedenle profesyonel kullanıcı sayısını şimdilik 10 kişi ile sınırlı tutuyoruz.
                <hr/>
                {self.state.profileDtos.map((user, i) => {

                    return (<div className="full-width searchItemContainer">

                            <div className={"float-left"}>
                                <h5>{(i + 1)}&nbsp;</h5>
                            </div>
                            <div className={"float-left"}>
                                <ProfilePicMobile
                                    userId={user.id}
                                    profilePicName={user.profilePicName}
                                    cssClass={"profilePicSmallMobile"}
                                />
                                <br/>

                                <strong>{user.name +" "+user.surname}</strong><br/>
                                <span>{user.title}</span>
                            </div>
                        <div className={"clear-both"}/>
                    </div>)
                })}
            </div>

        )
    }
}

export default Professionals;