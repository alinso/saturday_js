import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import UserUtil from "../../util/UserUtil";
import JSUtil from "../../util/JSUtil";
import AlertMobile from "../common/AlertMobile";
import ActivityEditButtonsMobile from "../common/ActivityEditButtonsMobile";
import Globals from "../../util/Globals";

const axios = require('axios');


class ActivityRequestsMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            photoName: null,
            activityId: null,
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

        axios.get(Globals.serviceUrl + 'activity/activityWithRequests/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({photoName: response.data.photoName});
                self.setState({deadLineString: response.data.deadLineString});
                self.setState({requests: response.data.requests});
                self.setState({activityId: response.data.id});

            })
            .catch(function (error) {
                self.setState({errors: error.response.data});
                console.log(error.response);
            });

    }

    deleteActivity(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtiniz?"))
            return;

        axios.get(Globals.serviceUrl + "activity/delete/" + id, Security.authHeader())
            .then(res => {
                window.location = "/profile/" + localStorage.getItem("userId");
            });
    }

    toggleApprove(id) {
        const self = this;
        axios.get(Globals.serviceUrl + 'request/approveRequest/' + id, Security.authHeader())
            .then(function (response) {
                let requests = self.state.requests;
                let currentRequestOld = requests.filter(obj => {
                    return obj.id === id
                });

                let currentRequestNew = Object.assign({}, currentRequestOld)[0];
                currentRequestNew.activityRequestStatus = response.data;

                let requestsNew = JSUtil.deleteFromArrayByPropertyName(requests, "id", id);
                requestsNew.push(currentRequestNew);
                requestsNew.sort(JSUtil.compareByRequestatus);


                self.setState({requests: requestsNew});
            })
            .catch(function (error) {

                console.log(error);
                self.setState({errors: error.response.data});
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
                    <ActivityEditButtonsMobile
                        activityId={this.state.activityId}
                        userId={parseInt(localStorage.getItem("userId"))}
                        deleteActivity={() => self.deleteActivity(this.state.activityId)}
                    />
                </div>
                <div className={"clear-both"}/>
                <hr/>
                <h5><a href={"/messageActivity/" + this.state.activityId}> <i className="fas fa-envelope"/> Grup
                    Sohbetine Katıl</a></h5>
                <hr/>
                <div className={"full-width"}>
                    <strong>Katılmak İsteyen Kişiler</strong><br/>
                    <strong>Geleceğim deyip gelmeyen veya son anda haber verenlere MUTLAKA olumusuz yorum yaz!</strong>

                    {this.state.errors.userWarningMessage && (
                        <AlertMobile
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
                                <ProfilePicMobile
                                    userId={request.profileDto.id}
                                    profilePicName={request.profileDto.profilePicName}
                                    cssClass={"profilePicSmallMobile"}
                                /><br/>
                                <UserFullNameMobile
                                    user={request.profileDto}
                                />
                            </div>
                            <div className={"half-left"}>
                                {UserUtil.translateGender(request.profileDto.gender)} / {request.profileDto.age}
                                <br/>
                                {
                                    (request.activityRequestStatus === "WAITING") &&
                                    (<button onClick={() => self.toggleApprove(request.id)}
                                             className={"btn btn-info"}>ONAYLA</button>)
                                }
                                {
                                    (request.activityRequestStatus === "APPROVED") && (
                                        <button onClick={() => self.toggleApprove(request.id)}
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


export default ActivityRequestsMobile;