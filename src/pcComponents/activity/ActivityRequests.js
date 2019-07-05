import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import UserUtil from "../../util/UserUtil";
import JSUtil from "../../util/JSUtil";
import Alert from "../common/Alert";
import ActivityEditButtons from "../common/ActivityEditButtons";
import Globals from "../../util/Globals";

const axios = require('axios');


class ActivityRequests extends React.Component {
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

        axios.get(Globals.serviceUrl+'activity/activityWithRequests/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({photoName: response.data.photoName});
                self.setState({deadLineString: response.data.deadLineString});
                self.setState({requests: response.data.requests});
                self.setState({activityId: response.data.id});

            })
            .catch(function (error) {
                self.setState({errors:error.response.data});
                console.log(error.response);
            });

    }

    deleteActivity(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtiniz?"))
            return;

        axios.get(Globals.serviceUrl+"activity/delete/" + id, Security.authHeader())
            .then(res => {
                window.location="/profile/"+localStorage.getItem("userId");
            });
    }

    toggleApprove(id) {
        const self = this;
        axios.get(Globals.serviceUrl+'request/approveRequest/' + id, Security.authHeader())
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
        if(this.state.errors.recordNotFound404Message){
            return( <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                    Sayfa Bulunamadı
                </div></div>)
        }

        return (
            <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                    <div className={"row meetingListSingleMeetingContainer"}>
                        <div className={"col-md-12 meetingListMeetingText"}>
                            <div className={"col-md-12"}>
                                {this.state.detail}
                            </div>
                            {(this.state.photoName != null) && (
                                <div className={"col-md-12"}>
                                    <img className={"meetingListPhoto col-md-8"}
                                         src={"/upload/" + this.state.photoName}/>
                                    <hr/>
                                </div>
                            )}
                            <div className={"row"}>
                                <div className={"col-md-8 meetingDeadLine"}>
                                    <button className={"btn btn-warning"}> {this.state.deadLineString}</button>
                                </div>
                                <div className={"col-md-4"}>
                                    <ActivityEditButtons
                                        activityId={this.state.activityId}
                                        userId={parseInt(localStorage.getItem("userId"))}
                                        deleteActivity={() => self.deleteActivity(this.state.activityId)}
                                    />
                                </div>
                                <hr/>
                            </div>
                        </div>
                        <div className={"col-md-12"}>
                            <hr/>
                            <strong>Katılmak İsteyen Kişiler</strong><br/>
                            <strong>Geleceğim deyip gelmeyen veya son anda haber verenlere MUTLAKA olumusuz yorum yaz!</strong>

                            {this.state.errors.userWarningMessage && (
                                <Alert
                                    type={"alert-danger"}
                                    message={this.state.errors.userWarningMessage}
                                />
                            )}
                        </div>
                        <div className={"col-md-12"}>
                            <div className={"row"}>
                                {this.state.requests &&
                                this.state.requests.map(function (request) {

                                    return (

                                        <div className={"col-md-3"}>
                                            <ProfilePic
                                                userId={request.profileDto.id}
                                                profilePicName={request.profileDto.profilePicName}
                                                cssClass={"profilePicMedium"}
                                            />
                                            <UserFullName
                                                user={request.profileDto}
                                            />
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
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>

        );
    }
}


export default ActivityRequests;