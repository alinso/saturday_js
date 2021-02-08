import React from "react";
import Security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');

class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            gender: "UNSELECTED",
            profilePicName: "",
            isReviewedBefore: false,
            followStatus: false,
            isBlocked: false,
            about: "",
            age: "",
            attendPercent: null,
            motivation: "",
            interestsArray: [],
            premiumType: false,
            errors: {},
            haveTheseUsersEverMeet: false,
            vote: null,
            myVoteOfThisUser: null,
            followerCount: 0
        };

        this.follow = this.follow.bind(this);
        this.block = this.block.bind(this);
        this.onVoteChanged = this.onVoteChanged.bind(this);
        this.haveTheseUsersEverMeet = this.haveTheseUsersEverMeet.bind(this);

    }

    componentDidMount() {
        this.haveTheseUsersEverMeet();
        this.fillPage();
    }


    haveTheseUsersEverMeet() {
        let self = this;
        if (Security.isValidToken()) {
            if (localStorage.getItem("userId") !== this.props.match.params.id) {
                axios.get(Globals.serviceUrl + 'vote/haveTheseUsersEverMeet/' + this.props.match.params.id, Security.authHeader())
                    .then(function (response) {
                        self.setState({"haveTheseUsersEverMeet": response.data});
                        axios.get(Globals.serviceUrl + 'vote/myVoteOfThisUser/' + self.props.match.params.id, Security.authHeader())
                            .then(function (response) {
                                self.setState({"myVoteOfThisUser": response.data});
                            });
                    });
            }
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

                self.setState({interestsArray: response.data.interests});
            });

        axios.get(Globals.serviceUrl + 'vote/voteCountOfUser/' + userId, Security.authHeader())
            .then(function (response) {
                self.setState({voteCount: response.data});
            });

        if (Security.isValidToken())
            axios.get(Globals.serviceUrl + 'follow/followStatus/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"followStatus": response.data});
                });
        if (Security.isValidToken())
            axios.get(Globals.serviceUrl + 'block/isBlockedIt/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"isBlocked": response.data});
                });
        if (Security.isValidToken()) {
            axios.get(Globals.serviceUrl + 'vote/votePercent/' + userId, Security.authHeader())
                .then(function (response) {
                    self.setState({"votePercent": response.data});
                });
        }

    }

    follow() {
        const self = this;
        axios.get(Globals.serviceUrl + 'follow/follow/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({"followStatus": response.data});
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
                <a className={"full-width"} href={"/complain/" + this.props.match.params.id}>
                    <button className={"btn btn-menuColorMobile profileButton"}><i className="far fa-angry"></i> Şikayet
                        et
                    </button>
                </a>
            )
        }
    }


    reviewButton() {
        if (this.props.match.params.id !== localStorage.getItem("userId")) {
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
        if (this.state.followStatus=="APPROVED" && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (
                <div className={"full-width"}>
                    <button onClick={this.follow} className={"btn btn-menuColorMobile profileButton "}><strong>
                        <i className="far fa-bell-slash"/>
                    </strong>unfollow
                    </button>
                </div>
            )
        }

        if (this.state.followStatus=="NOT_FOLLOWING" && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (<div className={"full-width"}>
                    <button onClick={this.follow} className={"btn btn-menuColorMobile profileButton"}><strong><i
                        className="far fa-bell"/></strong>
                        follow
                    </button>
                </div>
            )
        }
        if (this.state.followStatus=="WAITING" && this.props.match.params.id !== localStorage.getItem("userId")) {
            return (<div className={"full-width"}>
                    <button onClick={this.follow} className={"btn btn-menuColorMobile profileButton"}><strong><i
                        className="far fa-bell"/></strong>
                        requested
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

    onVoteChanged(voteType) {
        let self = this;
        let voteDto = {};
        voteDto.readerId = this.props.match.params.id;
        voteDto.voteType = voteType;
        voteDto.writerId = null;

        axios.post(Globals.serviceUrl + 'vote/save/', voteDto, Security.authHeader())
            .then(function (response) {
                self.setState({myVoteOfThisUser: voteType})
            });
    }


    render() {

        let {interestsArray} = this.state;

        return (
            <div className="full-width container">
                <div className={"full-width"}>


                        <img className={"profilePicMedium float-left"}
                             src={UserUtil.buildProfilePicUrl(this.state.profilePicName)}/>

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

                        {/*<h6>{this.state.point} <i className="far fa-star"/></h6>*/}
                        <span><strong><i className="fas fa-user"/> {this.state.followerCount}</strong></span>
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

                {this.state.haveTheseUsersEverMeet && (
                    <div className={"full-width vibeQuestionContainer"}>
                        <div className="form-group">
                            <strong>Would you prefer to join an event with this person again?</strong><br/>
                            (Bu cevabı yalnız sen görebilirsin ve istediğin zaman değiştirebilirsin) <br/>
                            <label className="customRadioLabelMobile">YES&nbsp;</label>
                            <input type="radio"
                                   name="myVoteOfThisUser"
                                   checked={this.state.myVoteOfThisUser === "POSITIVE"}
                                   onChange={() => this.onVoteChanged("POSITIVE")}
                                   className="customRadio"
                            />&nbsp;&nbsp;&nbsp;&nbsp;
                            <label className="customRadioLabelMobile">NO&nbsp;</label>
                            <input type="radio"
                                   name="myVoteOfThisUser"
                                   onChange={() => this.onVoteChanged("NEGATIVE")}
                                   checked={this.state.myVoteOfThisUser === "NEGATIVE"}
                                   className="customRadio"
                            />
                            <label className="customRadioLabelMobile">MAYBE&nbsp;</label>
                            <input type="radio"
                                   name="myVoteOfThisUser"
                                   onChange={() => this.onVoteChanged("NOTR")}
                                   checked={this.state.myVoteOfThisUser === "NOTR"}
                                   className="customRadio"
                            />
                        </div>
                    </div>
                )}

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
                        <a className="profilePhotoReviewActivity" href={"/album/" + this.props.match.params.id}>
                            Fotoğraflar
                        </a>
                    </div>
                    <div className="profileTitleMobileDiv">
                        <a className="profilePhotoReviewActivity" href={"/reviews/" + this.props.match.params.id}>
                            Yorumlar
                        </a>
                    </div>
                    <div className="profileTitleMobileDiv">
                        <a className="profilePhotoReviewActivity"
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

export default OtherProfile;