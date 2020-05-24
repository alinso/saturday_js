import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import ProfilePic from "../../pcComponents/common/ProfilePic";
import UserFullName from "../../pcComponents/common/UserFullName";
import UserUtil from "../../util/UserUtil";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";

const axios = require('axios');


class UsersICanVibe extends React.Component {
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
        axios.get(Globals.serviceUrl + 'vibe/usersICanVibe', Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({profileDtos: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    onVibeChanged(vibeType,readerId) {
        let self = this;
        let vibeDto = {};
        vibeDto.readerId = readerId;
        vibeDto.vibeType = vibeType;
        vibeDto.writerId = null;

        axios.post(Globals.serviceUrl + 'vibe/save/', vibeDto, Security.authHeader())
            .then(function (response) {
                self.fillPage();
            });
    }

    render() {

        let self = this;
        return (
            <div className="full-width text-align-left container">
                <hr/>
                Bu liste oy verebileceğin tüm kullanıcıları gösteriyor. Lütfen bu insanlara olumlu veya olumsuz oy ver, böylece aktiviteler öncesi
                diğer insanlar da fikir sahibi olabilirler. Merak etme, verdiğin cevabı yalnız sen görebilirsin ve dilediğin zaman değiştirebilirsin. Kaliteyi düşürdüğünü
                düşündüğün veya hoşlanmadığın kullanıcılara olumsuz, tam tersi birlikte vakit geçirmekten keyif aldığın kişilere de olumlu oy vermelisin.
                <hr/>
                {self.state.profileDtos.map((user, i) => {

                    return (<div className="full-width searchItemContainer">
                        <div className="half-left">
                            <div className={"float-left"}>
                                <ProfilePicMobile
                                    userId={user.id}
                                    profilePicName={user.profilePicName}
                                    cssClass={"profilePicSmallMobile"}
                                />
                                <br/>

                                <strong>
                                    {user.userPremium && (
                                        <span><i className="far fa-check-circle"/>&nbsp;</span>
                                    )}
                                    {user.name }</strong>


                            </div>
                        </div>
                        <div className={"half-left"}>
                            <h5>{UserUtil.translateGender(user.gender)} / {user.age}</h5>
                        </div>
                        <div className={"half-left text-align-left"}>
                                <div className="form-group">
                                    <input type="radio"
                                           name={"myVibeOfThisUser"+user.id}
                                           checked={user.myVibe=="POSITIVE"}
                                           onChange={() => this.onVibeChanged("POSITIVE",user.id)}
                                           className="customRadio"
                                    />                                    <label className="customRadioLabelMobile">Olumlu&nbsp;</label>
                                    <br/>
                                    <input type="radio"
                                           name={"myVibeOfThisUser"+user.id}
                                           onChange={() => this.onVibeChanged("NEGATIVE",user.id)}
                                           checked={user.myVibe==="NEGATIVE"}
                                           className="customRadio"
                                    />
                                    <label className="customRadioLabelMobile">Olumsuz&nbsp;</label>
                                </div>
                        </div>
                        <div className={"clear-both"}/>
                    </div>)
                })}
            </div>

        )
    }
}

export default UsersICanVibe;