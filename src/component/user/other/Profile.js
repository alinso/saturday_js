import React from "react";
import Security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import ProfilePic from "../../common/ProfilePic";
import UserFullName from "../../common/UserFullName";

const axios = require('axios');
const isMobile = require('is-mobile');


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
            isBlocked:false,
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
        if(!this.state.isBlocked) {
            if (window.confirm("Bu kişiyi engellemek istediğinizden emin misiniz?"))
                axios.get('http://localhost:8080/block/block/' + this.props.match.params.id, Security.authHeader())
                    .then(function (response) {
                        self.setState({"isBlocked": response.data});
                        window.location = "/";
                    });
        }

        if(this.state.isBlocked) {
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
                <a href={"/message/" + this.props.match.params.id} className={"row"}>
                    <button className={"btn btn-dark profileButton"}><strong><i className="far fa-comment"/></strong>Mesaj
                    </button>
                </a>)
        }
    }

    reviewButton() {
        if (!this.state.isReviewedBefore && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <a href={"/reviewForm/friend/" + this.props.match.params.id} className={"row"}>
                    <button className={"btn btn-dark profileButton"}><strong><i className="far fa-edit"/></strong>Referans
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
                    </strong>Bildirimleri Kapat
                    </button>
                </div>
            )
        }

        if (!this.state.isFollowing && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (<div className={"row"}>
                    <button onClick={this.follow} className={"btn btn-dark profileButton"}><strong><i
                        className="far fa-bell"/></strong>
                        Bildirimleri Aç
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
                            className={"btn btn-dark profileButton"}><strong><i className="fas fa-ban"/></strong>Engelle
                    </button>
                </div>
            )
        }
        if (this.props.match.params.id !== localStorage.getItem("userId") && this.state.isBlocked) {
            return (
                <div className={"row"}>
                    <button onClick={this.block}
                            className={"btn btn-dark profileButton"}><strong><i className="fas fa-ban"/></strong>Engeli Kaldır
                    </button>
                </div>
            )
        }

    }


    render() {


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
                            <UserFullName
                                name={this.state.name}
                                surname={this.state.surname}
                                userId={this.props.match.params.id}
                                point={this.state.point}
                            />
                            <h5>{this.state.gender} / {this.state.age}</h5>
                            <h4>{this.state.point} <i className="far fa-star"/></h4>
                            <div className={"col-md-12"}>
                                {this.sendMessageButton()}
                                {this.reviewButton()}
                                {this.followButton()}
                                {this.blockButton()}

                                {(this.props.match.params.id === localStorage.getItem("userId")) &&
                                (
                                    <div className={"text-align-left settingsTitles"}>
                                        <a href="/updateProfilePic/"><i className="far fa-smile-wink"/> Profil Fotoğrafım</a><br/>
                                        <a href="/myAlbum/"><i className="fas fa-images"/> Albüm</a><br/>
                                        <a href="/updateInfo/"><i className="fas fa-info-circle"/> Bilgilerim</a><br/>
                                        <a href="/updatePassword/"><i className="fas fa-key"/> Şifre Güncelle</a><br/>
                                        <a href="/referenceCodes/"><i className="fas fa-check"/> Referanslarım</a><br/>
                                        <a href="/followings/"><i className="fas fa-bell"/> Bildirim Listem</a><br/>
                                        <a href="/blocks/"><i className="fas fa-ban"/> Engel Listesi</a>
                                    </div>
                                )}

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
                                            Buluşmalar({this.state.activityCount})
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
                                                return (<span
                                                        className="badge badge-pill badge-success my-interests">{interest}</span>
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
                                    {this.state.about}
                                </div>
                            </div>

                            <div className="row card">
                                <div className="card-body">
                                    <h5 className="card-title">Neden Burdayım?</h5>
                                    <hr/>
                                    {this.state.motivation}
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