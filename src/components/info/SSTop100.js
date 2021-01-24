import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import ProfilePic from "../../../cemetery/pcComponents/common/ProfilePic";
import UserFullName from "../../../cemetery/pcComponents/common/UserFullName";
import UserUtil from "../../util/UserUtil";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";

const axios = require('axios');


class SSTop100 extends React.Component {
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
        axios.get(Globals.serviceUrl + 'user/socialScoreTop100', Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
            //    self.setState({profileDtos: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    render() {

        let self = this;
        return (
            <div className="full-width text-align-left container">
                <a href={"/activityTop100"}>EN AKTİF 100 LİSTESİ İÇİN TIKLA</a>

                <hr/>
                Bu sıralama kullanıcıların sosyal skorunu gösterir.
                Sosyal skor algoritması sistemdeki verileri kullanarak, tanışma öncesi kullanıcılarla ilgili fikir vermeye çalışan puanlama sistemidir.
                <hr/>
                {self.state.profileDtos.map((user, i) => {

                    return (<div className="full-width searchItemContainer">
                        <div className="half-left">
                            <div className={"float-left"}>
                                <h5>{(i + 1)}&nbsp;</h5>
                            </div>
                            <div className={"float-left"}>
                                <ProfilePic
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
                            {user.socialScore>0 &&(


                                <div className="progress">
                                    <div className="progress-bar-striped bg-info" role="progressbar"
                                         style={{width: (user.socialScore /10)+ '%',color:"white"}} aria-valuenow={user.socialScore}
                                         aria-valuemin="0" aria-valuemax="1000">{user.socialScore}
                                    </div>
                                </div>
                            )}
                            {user.socialScoree===-1 && this.user.socialScore!== 3212 &&(
                                <h6><strong><i className="fas fa-glass-cheers"/></strong>Yeterli veri yok</h6>

                            )}
                        </div>
                        <div className={"clear-both"}/>
                    </div>)
                })}
            </div>

        )
    }
}

export default SSTop100;