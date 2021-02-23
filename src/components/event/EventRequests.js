import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import UserUtil from "../../util/UserUtil";
import JSUtil from "../../util/JSUtil";
import Alert from "../common/Alert";
import EventEditButtons from "../common/event/EventEditButtons";
import Globals from "../../util/Globals";

const axios = require('axios');


class eventRequestsMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            photoName: null,
            eventId: null,
            detail: null,
            deadLineString: null,
            requests: null,
            errors: {}
        };

        this.fillPage();
        this.toggleApprove = this.toggleApprove.bind(this);
    }

    fillPage() {
        const self = this;

        axios.get(Globals.serviceUrl + 'event/eventWithRequests/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({photoName: response.data.photoName});
                self.setState({deadLineString: response.data.deadLineString});
                self.setState({requests: response.data.requests});
                self.setState({eventId: response.data.id});

            })
            .catch(function (error) {
                self.setState({errors: error.response.data});
                console.log(error.response);
            });

    }

    deleteevent(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtiniz?"))
            return;

        axios.get(Globals.serviceUrl + "event/delete/" + id, Security.authHeader())
            .then(res => {
                window.location = "/profile/" + localStorage.getItem("userId");
            });
    }

    toggleApprove(request) {
        const self = this;
        const id = request.id;


        axios.get(Globals.serviceUrl + 'user/attendanceRate/' + id, Security.authHeader())
            .then(function (response) {

                if (response.data < 70 && response.data > 1) {
                    let result = window.confirm("Bu profil onaylandığı aktivitelere yeteri katılım göstermemiş, aktivitene KABUL ETMEMENİ tavsiye ederiz");
                    if (!result)
                        return;
                }
                axios.get(Globals.serviceUrl + 'request/approveRequest/' + id, Security.authHeader())
                    .then(function (response) {
                        let requests = self.state.requests;
                        let currentRequestOld = requests.filter(obj => {
                            return obj.id === id
                        });

                        let currentRequestNew = Object.assign({}, currentRequestOld)[0];
                        currentRequestNew.eventRequestStatus = response.data;

                        let requestsNew = JSUtil.deleteFromArrayByPropertyName(requests, "id", id);
                        requestsNew.push(currentRequestNew);
                        requestsNew.sort(JSUtil.compareByRequestatus);


                        self.setState({requests: requestsNew});
                    })
                    .catch(function (error) {

                        console.log(error);
                        self.setState({errors: error.response.data});
                    });

            });

    }


    render() {

        const self = this;


        //sayfa bulunamadı common componentine cevir
        if (this.state.errors.recordNotFound404Message) {
            return (<div className="full-width">
                Sayfa Bulunamadı
            </div>)
        }

        return (
            <div className={"full-width container"}>
                <div className={"full-width meetingListMeetingText"}>

                    {this.state.detail}
                    {(this.state.photoName != null) && (
                        <div className={"full-width"}>
                            <img className={"meetingListPhoto "}
                                 src={"/upload/" + this.state.photoName}/>
                        </div>
                    )}
                </div>
                <br/>
                <div className={"half-left meetingDeadLine"}>
                    <i className="far fa-clock">{this.state.deadLineString}</i>
                </div>
                <div className={"half-left"}>
                    <eventEditButtonsMobile
                        eventId={this.state.eventId}
                        userId={parseInt(localStorage.getItem("userId"))}
                        deleteevent={() => self.deleteevent(this.state.eventId)}
                    />
                </div>
                <div className={"clear-both"}/>
                <hr/>
                <h5><a href={"/messageevent/" + this.state.eventId}> <i className="fas fa-envelope"/> Grup
                    Sohbetine Katıl</a></h5>
                <hr/>
                <div className={"full-width"}>
                    <strong>Katılmak İsteyen Kişiler</strong><br/>
                    <strong>GELMEYENLERİ YOKLAMADA İŞARETLE! İŞARETLEMEDİĞİN KİŞİLER GELMİŞ SAYILIR</strong>


                    {this.state.errors.userWarningMessage && (
                        <Alert
                            type={"alert-danger"}
                            message={this.state.errors.userWarningMessage}
                        />
                    )}
                    <hr/>
                </div>
                {this.state.requests &&
                this.state.requests.map(function (request) {
                    return (

                        <div className={"full-width"}>
                            <div className={"half-left"}>
                                <ProfilePic
                                    userId={request.profileDto.id}
                                    profilePicName={request.profileDto.profilePicName}
                                    cssClass={"profilePicSmallMobile"}
                                /><br/>
                                <UserFullName
                                    user={request.profileDto}
                                />
                            </div>
                            <div className={"half-left"}>
                                {UserUtil.translateGender(request.profileDto.gender)} / {request.profileDto.age}
                                <br/>
                                {
                                    (request.eventRequestStatus === "WAITING") &&
                                    (<button onClick={() => self.toggleApprove(request)}
                                             className={"btn btn-info"}>ONAYLA</button>)
                                }
                                {
                                    (request.eventRequestStatus === "APPROVED") && (
                                        <button onClick={() => self.toggleApprove(request)}
                                                className={"btn btn-danger"}>İPTAL ET</button>
                                    )
                                }
                            </div>
                            <div className={"clear-both"}/>
                        </div>
                    )
                })
                }
                <br/><br/>
            </div>
        );
    }
}


export default eventRequestsMobile;