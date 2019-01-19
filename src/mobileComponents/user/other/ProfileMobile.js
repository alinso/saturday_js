import React from "react";
import Security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import ProfilePicMobile from "../../common/ProfilePicMobile";
import UserFullNameMobile from "../../common/UserFullNameMobile";

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
            errors: {}
        };

        this.follow = this.follow.bind(this);
        this.block = this.block.bind(this);
        this.fillPage();
    }

    fillPage() {
        let self = this;
        let userId = this.props.match.params.id;

        axios.get('http://localhost:8080/user/profile/' + userId)
            .then(function (response) {
                self.setState(response.data);
                self.setState({"gender": UserUtil.translateGender(self.state.gender)});
                self.setState({"profilePicName": response.data.profilePicName});

                if (response.data.interests != null) {
                    let interests = response.data.interests.split(",");
                    self.setState({interestsArray: interests});
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });


        if (Security.isValidToken())
            axios.get('http://localhost:8080/review/isReviewedBefore/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isReviewedBefore": response.data});
                });


        if (Security.isValidToken())
            axios.get('http://localhost:8080/follow/isFollowing/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isFollowing": response.data});
                });
        if (Security.isValidToken())
            axios.get('http://localhost:8080/block/isBlocked/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isBlocked": response.data});
                });

    }

    follow() {
        const self = this;
        axios.get('http://localhost:8080/follow/follow/' + this.props.match.params.id, Security.authHeader())
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
                axios.get('http://localhost:8080/block/block/' + this.props.match.params.id, Security.authHeader())
                    .then(function (response) {
                        self.setState({"isBlocked": response.data});
                        window.location = "/";
                    });
        }

        if (this.state.isBlocked) {
            if (window.confirm("Bu kişinin engelini kaldırmak istediğinizden emin misiniz?"))
                axios.get('http://localhost:8080/block/block/' + this.props.match.params.id, Security.authHeader())
                    .then(function (response) {
                        self.setState({"isBlocked": response.data});
                    });
        }
    }


    sendMessageButton() {
        if (this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a href={"/message/" + this.props.match.params.id} className={"full-width"}>
                    <button className={"btn btn-menuColor profileButton"}><strong><i className="far fa-comment"/></strong>Mesaj
                    </button>
                </a>)
        }
    }

    reviewButton() {
        if (!this.state.isReviewedBefore && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a href={"/reviewForm/" + this.props.match.params.id} className={"full-width"}>
                    <button className={"btn btn-menuColor profileButton"}><strong><i className="far fa-edit"/></strong>Yorum
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
                    <button onClick={this.follow} className={"btn btn-menuColor profileButton "}><strong>
                        <i className="far fa-bell-slash"/>
                    </strong>Listeden Çıkar
                    </button>
                </div>
            )
        }

        if (!this.state.isFollowing && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (<div className={"full-width"}>
                    <button onClick={this.follow} className={"btn btn-menuColor profileButton"}><strong><i
                        className="far fa-bell"/></strong>
                        Listeye Ekle
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
                            className={"btn btn-menuColor profileButton"}><strong><i className="fas fa-ban"/></strong>Engelle
                    </button>
                </div>
            )
        }
        if (this.props.match.params.id !== localStorage.getItem("userId") && this.state.isBlocked) {
            return (
                <div className={"full-width"}>
                    <button onClick={this.block}
                            className={"btn btn-menuColor profileButton"}><strong><i className="fas fa-ban"/></strong>Engeli
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

                    <a href={"/updateProfilePic/"} className={"float-left"}>
                        <img className={"profilePicMedium"}
                             src={UserUtil.buildProfilePicUrl(this.state.profilePicName)}/>
                    </a>
                    <div className={"float-left profileMeta"}>
                        <UserFullNameMobile
                            name={this.state.name}
                            surname={this.state.surname}
                            userId={this.props.match.params.id}
                            point={this.state.point}
                        />

                        <h5>{this.state.gender} / {this.state.age}</h5>
                        <h4>{this.state.point} <i className="far fa-star"/></h4>
                    </div>
                    <div className={"clear-both"}/>
                </div>


                <div className={"full-width"}>
                    <div className={"half-left"}>
                        {this.sendMessageButton()}
                        {this.followButton()}
                    </div>
                    <div className={"half-left "}>

                        {this.blockButton()}
                        {this.reviewButton()}

                    </div>
                    <div className={"clear-both"}/>
                </div>
                {(this.props.match.params.id === localStorage.getItem("userId")) &&
                (<div className={"full-width"}>
                        <div className={"text-align-left settingsTitles"}>
                            <a href="/myAlbum/"><i className="fas fa-images"/> Albüm</a><br/>
                            <a href="/updateInfo/"><i className="fas fa-info-circle"/>Bilgilerim</a><br/>
                            <a href="/updatePassword/"><i className="fas fa-key"/> Şifre</a><br/>
                        </div>

                        <div className={"text-align-left settingsTitles"}>
                            <a href="/referenceCodes/"><i className="fas fa-check"/> Referanslar</a><br/>
                            <a href="/followings/"><i className="fas fa-bell"/> Bildirim</a><br/>
                            <a href="/blocks/"><i className="fas fa-ban"/> Engel Listesi</a>
                        </div>
                        <div className={"clear-both"}></div>

                    </div>
                )}
                <br/>
                <div className={"profileTitleContainer full-width"}>
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
                            Buluşmalar({this.state.activityCount})
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
                                return (<span
                                        className="badge badge-pill badge-success my-interests">{interest}</span>
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
                        <h5 className="card-title">Neden Burdayım?</h5>
                        <hr/>
                        <span className={"breakLine"}>
                                    {this.state.motivation}
                                    </span>
                    </div>
                </div>
                <br/><br/><br/>
            </div>
        )
    }
}

export default ProfileMobile;