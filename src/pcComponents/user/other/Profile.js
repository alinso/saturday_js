import React from "react";
import Security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import ProfilePic from "../../common/ProfilePic";
import Globals from "../../../util/Globals";
import CompleteProfile from "../../common/CompleteProfile";

const axios = require('axios');


class Profile extends React.Component {
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
            photoCount: 0,
            reviewCount: 0,
            userPremium: false,
            errors: {}
        };

        this.follow = this.follow.bind(this);
        this.block = this.block.bind(this);
        this.fillPage();
    }

    fillPage() {
        let self = this;
        let userId = this.props.match.params.id;

        axios.get(Globals.serviceUrl + 'user/profile/' + userId)
            .then(function (response) {
                self.setState(response.data);
                self.setState({"gender": UserUtil.translateGender(self.state.gender)});

                if (response.data.interests != null) {
                    let interests = response.data.interests.split("#");
                    self.setState({interestsArray: interests});
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
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
                <a href={"/message/" + this.props.match.params.id} className={"row"}>
                    <button className={"btn btn-success profileButton"}><strong><i
                        className="far fa-comment"/></strong> Mesaj
                    </button>
                </a>)
        }
    }

    complainButton() {
        if (this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a href={"/complain/" + this.props.match.params.id} className={"row"}>
                    <button className={"btn btn-danger profileButton"}><strong>
                        <i className="fas fa-exclamation"/></strong> Şikayet Et
                    </button>
                </a>)
        }
    }

    reviewButton() {
        if (!this.state.isReviewedBefore && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a href={"/reviewForm/" + this.props.match.params.id} className={"row"}>
                    <button className={"btn btn-dark profileButton"}><strong><i className="far fa-edit"/></strong> Yorum
                        Yaz
                    </button>
                </a>
            )
        }
    }


    followButton() {
        if (this.state.isFollowing && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <div className={"row"}>
                    <button onClick={this.follow} className={"btn btn-dark profileButton "}><strong>
                        <i className="far fa-bell-slash"/>
                    </strong> Listemden Çıkar
                    </button>
                </div>
            )
        }

        if (!this.state.isFollowing && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (<div className={"row"}>
                    <button onClick={this.follow} className={"btn btn-dark profileButton"}><strong><i
                        className="far fa-bell"/></strong> Listeme Ekle
                    </button>
                </div>
            )
        }
    }


    blockButton() {
        if (this.props.match.params.id !== localStorage.getItem("userId") && !this.state.isBlocked) {
            return (
                <div className={"row"}>
                    <button onClick={this.block}
                            className={"btn btn-danger profileButton"}><strong><i
                        className="fas fa-ban"/></strong> Engelle
                    </button>
                </div>
            )
        }
        if (this.props.match.params.id !== localStorage.getItem("userId") && this.state.isBlocked) {
            return (
                <div className={"row"}>
                    <button onClick={this.block}
                            className={"btn btn-danger profileButton"}><strong><i
                        className="fas fa-ban"/></strong> Engeli Kaldır
                    </button>
                </div>
            )
        }

    }

    render() {

        console.log(this.state.userPremium);
        return (
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProfilePic
                                profilePicName={this.state.profilePicName}
                                userId={this.props.match.params.id}
                            />
                            <br/>
                            <a className="userFullName" href={"/profile/" + this.props.match.params.id}>
                                <strong>
                                    {this.state.userPremium && (
                                        <span><i className="far fa-check-circle"/>&nbsp;</span>
                                    )}
                                    {this.state.name + " " + this.state.surname}</strong>
                            </a><br/>


                            <span>{this.state.gender} / {this.state.age}</span>
                            <h4>{this.state.point} <i className="far fa-star"/></h4>
                            <hr/>
                            {/*{(this.props.match.params.id === localStorage.getItem("userId")) &&*/}
                            {/*(*/}
                                {/*<a href={"/getPremium"}>*/}
                                    {/*<button className={"btn btn-success"}><i className="fas fa-crown"/> <strong>Premium*/}
                                        {/*Ol !</strong></button>*/}
                                {/*</a>*/}
                            {/*)}*/}
                            <hr/>
                            <div className={"col-md-12"}>
                                {this.sendMessageButton()}
                                {this.reviewButton()}
                                {this.followButton()}.
                                {this.blockButton()}
                                {this.complainButton()}

                                {(this.props.match.params.id === localStorage.getItem("userId")) &&
                                (
                                    <div className={"text-align-left settingsTitles"}>
                                        <a href="/updateProfilePic/"><i className="far fa-smile-wink"/> Profil
                                            Fotoğrafım</a><br/>
                                        <a href="/myAlbum/"><i className="fas fa-images"/> Albüm</a><br/>
                                        <a href="/updateInfo/"><i className="fas fa-info-circle"/> Bilgilerim</a><br/>
                                        <a href="/updatePassword/"><i className="fas fa-key"/> Şifre Güncelle</a><br/>
                                        {/*<a href="/referenceCodes/"><i className="fas fa-check"/> Referans Ol</a><br/>*/}
                                        <a href="/followings/"><i className="fas fa-bell"/> Bildirim Listem</a><br/>
                                        <a href="/blocks/"><i className="fas fa-ban"/> Engel Listesi</a>
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


                            </div>

                        </div>

                        <div className="col-md-9 profileContent">
                            <div className="row">
                                <div className={"profileTitleContainer m-auto"}>
                                    <div className="profileTitleDiv">
                                        <a className="profileTitle" href={"/album/" + this.props.match.params.id}>
                                            Fotoğraflar({this.state.photoCount})
                                        </a>
                                    </div>
                                    <div className="profileTitleDiv">
                                        <a className="profileTitle" href={"/reviews/" + this.props.match.params.id}>
                                            Yorumlar ({this.state.reviewCount})
                                        </a>
                                    </div>
                                    <div className="profileTitleDiv">
                                        <a className="profileTitle"
                                           href={"/userActivities/" + this.props.match.params.id}>
                                            Aktiviteler({this.state.activityCount})
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="card col-md-12">
                                    <div className="card-body">
                                        <h5 className="card-title">İlgi Alanlarım</h5>
                                        <hr/>
                                        {
                                            this.state.interestsArray.map(function (interest) {
                                                if (interest !== "")
                                                    return (<a href={"/searchUser?hashtag=" + interest}> <span
                                                            className="badge badge-pill badge-success my-interests">{"#" + interest}</span></a>
                                                    )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="row card">
                                <div className="card-body">
                                    <h5 className="card-title">Hakkımda</h5>
                                    <hr/>
                                    <span className={"breakLine"}>
                                        {this.state.about}
                                    </span>

                                </div>
                            </div>

                            <div className="row card">
                                <div className="card-body">
                                    <h5 className="card-title">Şunları önerebilirim?</h5>
                                    <hr/>
                                    <span className={"breakLine"}>
                                    {this.state.motivation}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;