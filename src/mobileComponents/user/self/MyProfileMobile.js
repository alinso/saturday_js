import React from "react";
import Security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import Globals from "../../../util/Globals";
import CompleteProfile from "../../../pcComponents/common/CompleteProfile";

const axios = require('axios');

class MyProfileMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            gender: "UNSELECTED",
            profilePicName: "",
            about: "",
            age: "",
            attendPercent: null,
            motivation: "",
            interestsArray: [],
            activityCount: 0,
            premiumType: false,
            errors: {},
            latestPremiumDate: "",
            vibePercent: 0,
            vibeCount: 0,
            followerCount: 0
        };

        this.deleteAccount = this.deleteAccount.bind(this);

    }

    componentDidMount() {
        this.fillPage();
    }

    deleteAccount() {
        let res = window.prompt("Hesabın tamamen silinecek, gerçekten silmek istiyorsan aşağıdaki kutuya onaylıyorum yaz ve onay butonunu tıkla");
        let self = this;

        if (res === "onaylıyorum") {
            axios.get(Globals.serviceUrl + 'user/deleteAccount/' + localStorage.getItem("userId"), Security.authHeader()).then(function (response) {
                alert("Hesabın silindi :( umarım geri gelirsin :(");
                localStorage.removeItem("jwtToken");
                window.location = "/";
            })
                .catch(function (error) {
                    console.log(error);
                    self.setState({"errors": error.response.data});
                });
        }
    }


    fillPage() {
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get(Globals.serviceUrl + 'user/profile/' + userId)
            .then(function (response) {
                self.setState(response.data);
                self.setState({"gender": UserUtil.translateGender(self.state.gender)});
                self.setState({"profilePicName": response.data.profilePicName});

                self.setState({interestsArray: response.data.categories});
            });

        axios.get(Globals.serviceUrl + 'premium/latestPremiumDate/', Security.authHeader())
            .then(function (response) {
                self.setState({latestPremiumDate: response.data});
            });
        axios.get(Globals.serviceUrl + 'vibe/vibeCountOfUser/' + userId, Security.authHeader())
            .then(function (response) {
                self.setState({vibeCount: response.data});
            });

        axios.get(Globals.serviceUrl + 'vibe/vibePercent/' + userId, Security.authHeader())
            .then(function (response) {
                self.setState({"vibePercent": response.data});
            });
    }

    render() {

        let {interestsArray} = this.state;

        return (
            <div className="full-width container">
                <div className={"full-width"}>

                    {(localStorage.getItem("userId") === this.props.match.params.id) && (
                        <a href={"/updateProfilePic/"} className={"float-left"}>
                            <img className={"profilePicMedium"}
                                 src={UserUtil.buildProfilePicUrl(this.state.profilePicName)}/>
                        </a>
                    )}

                    {(localStorage.getItem("userId") !== this.props.match.params.id) && (
                        <img className={"profilePicMedium float-left"}
                             src={UserUtil.buildProfilePicUrl(this.state.profilePicName)}/>
                    )}

                    <div className={"float-left profileMetaMobile"}>
                        <a className="userFullName" href={"/profile/" + this.props.match.params.id}>
                            <strong>
                                {this.state.premiumType === "GOLD" && (

                                    <span className={'goldCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                                )}
                                {this.state.premiumType === "SILVER" && (

                                    <span className={'silverCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                                )}
                                {this.state.premiumType === "ORGANIZATOR" && (

                                    <span className={'proCheck'}><i className="fas fa-certificate"/>&nbsp;</span>
                                )}
                                {this.state.name + " " + this.state.surname}</strong>
                        </a><br/>

                        <h5>{this.state.gender} / {this.state.age}</h5>


                    </div>
                    <div className={"clear-both"}/>

                </div>
                <span><strong>{this.state.followerCount}</strong> kişi listeye eklemiş</span>

                <hr/>
                <div>
                    <h6> Olumlu izlenim oranı({this.state.vibeCount} oy)</h6>
                    {this.state.vibePercent > 0 && (
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar"
                                 style={{width: this.state.vibePercent + '%'}} aria-valuenow="50"
                                 aria-valuemin="0" aria-valuemax="100">{this.state.vibePercent}%
                            </div>
                        </div>
                    )}
                    {this.state.vibePercent === 0 && (
                        <span>Yeterli veri yok!</span>
                    )}
                    <hr/>

                </div>
                {this.state.attendPercent != null && (
                    <div>
                        Onaylandığı aktivitelere katılım oranı
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"
                                 style={{width: this.state.attendPercent + '%'}} aria-valuenow="50"
                                 aria-valuemin="0" aria-valuemax="100">{this.state.attendPercent}%
                            </div>
                        </div>
                        <hr/>
                    </div>
                )}


                <div className={"full-width"}>


                    {this.state.latestPremiumDate !== "" && (
                        <span>Premium üyelik son tarih: {this.state.latestPremiumDate}</span>
                    )}
                    <br/>

                    <div className={"text-align-left settingsTitlesMobile"}>
                        <a href="/myAlbum/">
                            <button className={"btn btn-menuColorMobile profileButton"}><i
                                className="fas fa-images"/> Albüm
                            </button>
                        </a><br/>
                        <a href="/updateInfo/">
                            <button className={"btn btn-menuColorMobile profileButton"}><i
                                className="fas fa-info-circle"/> Bilgilerim
                            </button>
                        </a>
                        <a href="/categories/">
                            <button className={"btn btn-menuColorMobile profileButton"}><i
                                className="fas fa-chess-knight"/> İlgi Alanlarım
                            </button>
                        </a>
                        <a href={"/usersICanVibe"}>
                            <button className={"btn btn-menuColorMobile profileButton"}><strong> Verdiğim
                                Oylar</strong>
                            </button>
                        </a>

                        <br/><br/>
                        <button onClick={this.deleteAccount} className={"btn btn-danger profileButton"}><i
                            className=" fas fa-times"/> Hesabımı Sil
                        </button>
                    </div>


                    <div className={"text-align-left settingsTitlesMobile"}>
                        <a href="/referenceCodes/">
                            <button className={"btn btn-menuColorMobile profileButton"}><i
                                className="fas fa-check"/> Referanslar
                            </button>
                        </a><br/>
                        <a href="/followings/">
                            <button className={"btn btn-menuColorMobile profileButton"}><i
                                className="fas fa-bell"/> Listem
                            </button>
                        </a><br/>
                        <a href="/blocks/">
                            <button className={"btn btn-menuColorMobile profileButton"}><i
                                className="fas fa-ban"/> Engel Listesi
                            </button>
                        </a><br/>
                        <a href="/updatePassword/">
                            <button className={"btn btn-menuColorMobile profileButton"}><i
                                className="fas fa-key"/> Şifre
                            </button>
                        </a><br/>
                    </div>
                    <div className={"clear-both"}/>

                </div>
                <CompleteProfile
                    userId={this.props.match.params.id}
                    profilePicName={this.state.profilePicName}
                    age={this.state.age}
                    about={this.state.about}
                    interestsArray={this.state.interestsArray}
                    photoCount={this.state.photoCount}
                />
                <br/>
                {(localStorage.getItem("userId") === "3212")
                && (
                    <div className={"full-width"}>
                        <a href={"/uhktybb/police"} className={"float-left"}>
                            <button className={"btn btn-danger"}>Kullanıcı(id:{this.props.match.params.id})
                            </button>
                        </a>
                        <div className={"clear-both"}/>
                    </div>
                )}
                <div className={"full-width text-align-center"}>
                    <div className="profileTitleMobileDiv">
                        <a className="profilePhotoReviewActivity" href={"/album/" + localStorage.getItem("userId")}>
                            Fotoğraflar
                        </a>
                    </div>
                    <div className="profileTitleMobileDiv">
                        <a className="profilePhotoReviewActivity" href={"/reviews/" + localStorage.getItem("userId")}>
                            Yorumlar
                        </a>
                    </div>
                    <div className="profileTitleMobileDiv">
                        <a className="profilePhotoReviewActivity"
                           href={"/userActivities/" + localStorage.getItem("userId")}>
                            Aktiviteler
                        </a>
                    </div>
                    <div className={"clear-both"}/>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">İlgi Alanlarım</h5>
                        <hr/>
                        {
                            interestsArray.map(function (interest) {
                                if (interest !== "")
                                    return (<a href={"/categoryDetail/" + interest.id}>
                                            <span
                                                className="badge badge-pill badge-success my-interestsMobile">{interest.name}</span></a>
                                    )
                            })
                        }
                    </div>
                </div>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Hakkımda</h5>
                        <hr/>
                        <span className={"breakLine"}>
                                        {this.state.about}
                                    </span>

                    </div>
                </div>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Şunları önerebilirim?</h5>
                        <hr/>
                        <span className={"breakLine"}>
                                    {this.state.motivation}
                                    </span>
                    </div>
                </div>
                <br/>


                <br/><br/><br/>
            </div>
        )
    }
}

export default MyProfileMobile;