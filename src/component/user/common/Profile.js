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
            about: "",
            age: "",
            motivation: "",
            meetingCount: 0,
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
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });


        if (Security.isValidToken())
            axios.get('http://localhost:8080/review/isReviewedBefore/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isReviewedBefore": response.data});
                })
                .catch(function (error) {
                    self.setState({"errors": error.response.data});
                });

        if (Security.isValidToken())
            axios.get('http://localhost:8080/follow/isFollowing/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isFollowing": response.data});
                })
                .catch(function (error) {
                    self.setState({"errors": error.response.data});
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
        if (window.confirm("Bu kişiyi engellemek istediğinizden emin misiniz?"))
            axios.get('http://localhost:8080/block/block/' + this.props.match.params.id, Security.authHeader())
                .then(function (response) {
                    self.setState({"isBlocked": response.data});
                    window.location = "/";
                })
                .catch(function (error) {
                    self.setState({"errors": error.response.data});
                });
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
        if (this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <div className={"row"}>
                    <button onClick={this.block}
                            className={"btn btn-dark profileButton"}><strong><i className="fas fa-ban"/></strong>Engelle
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
                                    <a href="/settings/" className={"row"}>
                                        <button className={"btn btn-dark profileButton"}>Hesap Ayarları</button>
                                    </a>
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
                                           href={"/userMeetings/" + this.props.match.params.id}>
                                            Buluşmalar({this.state.meetingCount})
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="card col-md-12">
                                    <div className="card-body">
                                        <span className="badge badge-pill badge-success my-interests">Kitap</span>
                                        <span className="badge badge-pill badge-success my-interests">Müzik</span>
                                        <span
                                            className="badge badge-pill badge-success my-interests">Sinemaya Gitmek</span>
                                        <span
                                            className="badge badge-pill badge-success my-interests">Film İzlemek</span>
                                        <span
                                            className="badge badge-pill badge-success my-interests">Sinemaya Gitmek</span>
                                        <span
                                            className="badge badge-pill badge-success my-interests">Film İzlemek</span>
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