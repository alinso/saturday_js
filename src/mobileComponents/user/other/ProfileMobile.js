import React from "react";
import Security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import Globals from "../../../util/Globals";
import CompleteProfile from "../../../pcComponents/common/CompleteProfile";

const axios = require('axios');
const isMobile = require('is-mobile');


class ProfileMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            gender: "UNSELECTED",
            profilePicName: "",
            isReviewedBefore: false,
            isFollowing: false,
            isBlocked: false,
            about: "",
            age: "",
            motivation: "",
            interestsArray: [],
            activityCount: 0,
            premiumType:false,
            errors: {},
            latestPremiumDate:""
        };

        this.follow = this.follow.bind(this);
        this.block = this.block.bind(this);
        this.deleteAccount  =this.deleteAccount.bind(this);

        this.fillPage();
    }

    deleteAccount() {
        let res = window.prompt("Hesabın tamamen silinecek, gerçekten silmek istiyorsan aşağıdaki kutuya onaylıyorum yaz ve onay butonunu tıkla");
        let self = this;

        if (res === "onaylıyorum") {
            axios.get(Globals.serviceUrl + 'user/deleteAccount/' + localStorage.getItem("userId"), Security.authHeader()).
            then(function (response) {
                alert("Hesabın silindi :( umarım geri gelirsin :(");
                localStorage.removeItem("jwtToken");
                window.location="/";
            })
                .catch(function (error) {
                    console.log(error);
                    self.setState({"errors": error.response.data});
                });
        }
    }

    fillPage() {
        let self = this;
        let userId = this.props.match.params.id;

        axios.get(Globals.serviceUrl + 'user/profile/' + userId)
            .then(function (response) {
                self.setState(response.data);
                self.setState({"gender": UserUtil.translateGender(self.state.gender)});
                self.setState({"profilePicName": response.data.profilePicName});

                if (response.data.interests != null) {
                    let interests = response.data.interests.split("#");
                    self.setState({interestsArray: interests});
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });

        axios.get(Globals.serviceUrl + 'premium/latestPremiumDate/',Security.authHeader())
            .then(function (response) {
                self.setState({latestPremiumDate :response.data});
            });



        if (Security.isValidToken())
            axios.get(Globals.serviceUrl + 'review/isReviewedBefore/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isReviewedBefore": response.data});
                });


        if (Security.isValidToken())
            axios.get(Globals.serviceUrl + 'follow/isFollowing/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isFollowing": response.data});
                });
        if (Security.isValidToken())
            axios.get(Globals.serviceUrl + 'block/isBlocked/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isBlocked": response.data});
                });

    }

    follow() {
        const self = this;
        axios.get(Globals.serviceUrl + 'follow/follow/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({"isFollowing": response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    block() {
        const self = this;
        if (!this.state.isBlocked) {
            if (window.confirm("Bu kişiyi engellemek istediğinizden emin misiniz?"))
                axios.get(Globals.serviceUrl + 'block/block/' + this.props.match.params.id, Security.authHeader())
                    .then(function (response) {
                        self.setState({"isBlocked": response.data});
                        window.location = "/";
                    });
        }

        if (this.state.isBlocked) {
            if (window.confirm("Bu kişinin engelini kaldırmak istediğinizden emin misiniz?"))
                axios.get(Globals.serviceUrl + 'block/block/' + this.props.match.params.id, Security.authHeader())
                    .then(function (response) {
                        self.setState({"isBlocked": response.data});
                    });
        }
    }


    sendMessageButton() {
        if (this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a href={"/message/" + this.props.match.params.id} className={"full-width"}>
                    <button className={"btn btn-menuColorMobile profileButton"}><strong><i
                        className="far fa-comment"/></strong>Mesaj
                    </button>
                </a>)
        }
    }

    complainButton() {
        if (this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a className={"full-width"} href={"/complain/"+this.props.match.params.id}>
                    <button className={"btn btn-menuColorMobile profileButton"}><i className="far fa-angry"></i> Şikayet et</button></a>
            )
        }
    }


    reviewButton() {
        if (!this.state.isReviewedBefore && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a href={"/reviewForm/" + this.props.match.params.id} className={"full-width"}>
                    <button className={"btn btn-menuColorMobile profileButton"}><strong><i
                        className="far fa-edit"/></strong>Yorum
                        Yaz
                    </button>
                </a>
            )
        }
    }


    followButton() {
        if (this.state.isFollowing && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <div className={"full-width"}>
                    <button onClick={this.follow} className={"btn btn-menuColorMobile profileButton "}><strong>
                        <i className="far fa-bell-slash"/>
                    </strong>Listemden Çıkar
                    </button>
                </div>
            )
        }

        if (!this.state.isFollowing && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (<div className={"full-width"}>
                    <button onClick={this.follow} className={"btn btn-menuColorMobile profileButton"}><strong><i
                        className="far fa-bell"/></strong>
                        Listeme Ekle
                    </button>
                </div>
            )
        }
    }


    blockButton() {
        if (this.props.match.params.id !== localStorage.getItem("userId") && !this.state.isBlocked) {
            return (
                <div className={"full-width"}>
                    <button onClick={this.block}
                            className={"btn btn-menuColorMobile profileButton"}><strong><i
                        className="fas fa-ban"/></strong>Engelle
                    </button>
                </div>
            )
        }
        if (this.props.match.params.id !== localStorage.getItem("userId") && this.state.isBlocked) {
            return (
                <div className={"full-width"}>
                    <button onClick={this.block}
                            className={"btn btn-menuColorMobile profileButton"}><strong><i
                        className="fas fa-ban"/></strong>Engeli
                        Kaldır
                    </button>
                </div>
            )
        }

    }


    render() {


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
                                {this.state.premiumType==="GOLD" &&(

                                    <span className={'goldCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                                )}
                                {this.state.premiumType==="SILVER" &&(

                                    <span className={'silverCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                                )}
                                {this.state.name + " " + this.state.surname}</strong>
                        </a><br/>

                        <h5>{this.state.gender} / {this.state.age}</h5>
                        <h4>{this.state.point} <i className="far fa-star"/></h4>
                    </div>
                    <div className={"clear-both"}/>
                </div>
                <div className={"full-width"}>
                    <div className={"half-left"}>
                        {this.sendMessageButton()}
                        {this.followButton()}
                        {this.reviewButton()}

                    </div>
                    <div className={"half-left "}>

                        {this.blockButton()}
                        {this.complainButton()}

                    </div>
                    <div className={"clear-both"}/>
                </div>
                {(this.props.match.params.id === localStorage.getItem("userId")) &&
                (<div className={"full-width"}>


                        {this.state.latestPremiumDate!=="" &&(
                            <span>Premium üyelik son tarih: {this.state.latestPremiumDate}</span>
                        )}
                        <div className={"text-align-left settingsTitlesMobile"}>
                            <a href="/myAlbum/">
                                <button className={"btn btn-menuColorMobile profileButton"}><i
                                    className="fas fa-images"/> Albüm
                                </button>
                            </a><br/>
                            <a href="/updateInfo/">
                                <button className={"btn btn-menuColorMobile profileButton"}><i
                                    className="fas fa-info-circle"/>Bilgilerim
                                </button>
                            </a><br/>
                            <button  onClick={this.deleteAccount} className={"btn btn-danger profileButton"}><i
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
                                    className="fas fa-bell"/> Bildirim
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
                )}
                <CompleteProfile
                    userId={this.props.match.params.id}
                    profilePicName={this.state.profilePicName}
                    age={this.state.age}
                    about={this.state.about}
                    interestsArray={this.state.interestsArray}
                    photoCount={this.state.photoCount}
                />
                <br/>
                {(localStorage.getItem("userId") === "3211") && (
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
                        <a className="profileTitleMobile" href={"/album/" + this.props.match.params.id}>
                            Fotoğraflar
                        </a>
                    </div>
                    <div className="profileTitleMobileDiv">
                        <a className="profileTitleMobile" href={"/reviews/" + this.props.match.params.id}>
                            Yorumlar
                        </a>
                    </div>
                    <div className="profileTitleMobileDiv">
                        <a className="profileTitleMobile"
                           href={"/userActivities/" + this.props.match.params.id}>
                            Aktiviteler
                        </a>
                    </div>
                    <div className={"clear-both"}></div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">İlgi Alanlarım</h5>
                        <hr/>
                        {
                            this.state.interestsArray.map(function (interest) {
                                if (interest !== "")
                                    return (<a href={"/searchUser?hashtag=" + interest}> <span
                                            className="badge badge-pill badge-success my-interestsMobile">{"#" + interest}</span></a>
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

export default ProfileMobile;