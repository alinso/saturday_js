import React from "react";
import Security from "../security/Security";
import UserUtil from "../util/UserUtil";
import ProfilePic from "./common/ProfilePic";
import UserFullName from "./common/UserFullName";
import JSUtil from "../util/JSUtil";

const axios = require('axios');


class Dashboard extends React.Component {
    constructor() {
        super();
        Security.protect();

        this.state = {
            meetings: [],
        };

        this.fillPage();
        this.deleteMeeting = this.deleteMeeting.bind(this);
        this.updateMeeting = this.updateMeeting.bind(this);
        this.joinMeeting = this.joinMeeting.bind(this);
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/meeting/findAll', Security.authHeader())
            .then(function (response) {
                self.setState({meetings: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }



    joinMeeting(id){
        const self = this;
        axios.get('http://localhost:8080/meeting/join/'+id, Security.authHeader())
            .then(function (response) {
                let meetings = self.state.meetings;
                let currentMeetingOld = meetings.filter(obj => {
                    return obj.id === id
                });



                let currentMeetingNew  =Object.assign({},currentMeetingOld)[0];
                console.log(currentMeetingNew);
                currentMeetingNew.thisUserJoins = response.data;
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings,"id",id );
                meetingsNew.push(currentMeetingNew);
                meetingsNew.sort(JSUtil.compareByUpdatedAt);


                self.setState({meetings:meetingsNew});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    deleteMeeting(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtiniz?"))
            return;

        axios.get("http://localhost:8080/meeting/delete/" + id, Security.authHeader())
            .then(res => {

                let meetings = self.state.meetings;
                    // let deletedIndex = -1;
                    // meetings.forEach(function (meeting, index) {
                    //     if (meeting.id == id) {
                    //         deletedIndex = index;
                    //     }
                    // });
                    //
                    // if (deletedIndex > -1) {
                    //     meetings.splice(deletedIndex, 1);
                    // }
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings,"id",id );
                self.setState({meetings: meetingsNew});
            });
    }

    updateMeeting(id) {
        window.location = "/updateMeeting/" + id;
    }


    render() {
        const self = this;
        return (
            <div className="row">
                <div className="col-md-6 m-auto">
                    {
                        self.state.meetings.map(function (meeting, i) {
                            console.log(meeting);
                            return (
                                <div className={"row meetingListSingleMeetingContainer"}>
                                    <div className="col-md-3 meetingListProfile">

                                        <ProfilePic
                                            userId={meeting.profileDto.id}
                                            profilePicName={meeting.profileDto.profilePicName}
                                        />
                                        <UserFullName
                                            name={meeting.profileDto.name}
                                            userId={meeting.profileDto.id}
                                            surname={meeting.profileDto.surname}
                                        />
                                    </div>
                                    <div className={"col-md-9 "}>
                                        <div className={"row meetingListMeetingText"}>
                                            {(meeting.photoName!=null) &&(
                                                <div className={"col-md-12"}>
                                                    <img className={"meetingListPhoto col-md-8"} src={"/upload/"+meeting.photoName}/><hr/><br/>
                                                </div>
                                            )}

                                            <div className={"col-md-12"}>
                                            {meeting.detail}
                                            </div>
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-9 meetingListUserMeta"}>
                                                <button className={"btn btn-warning"}> {meeting.updatedAt}</button>
                                                &nbsp;&nbsp;&nbsp;
                                                <strong>
                                                    {UserUtil.translateGender(meeting.profileDto.gender)} / {meeting.profileDto.age}
                                                </strong>
                                                &nbsp;&nbsp;&nbsp;
                                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i
                                                className="fas fa-star"></i><i className="fas fa-star"></i><i
                                                className="fas fa-star"></i>(37)
                                                <br/>
                                            </div>
                                            <div className={"col-md-3"}>
                                                {(meeting.profileDto.id === parseInt(localStorage.getItem("userId"))) &&
                                                <div className={" row meetingListMeetingEditButtons"}>
                                                    <button onClick={() => self.updateMeeting(meeting.id)}
                                                            className="btn btn-info">düzenle
                                                    </button>
                                                    <button onClick={() => self.deleteMeeting(meeting.id)}
                                                            className="btn btn-warning">sil
                                                    </button>
                                                </div>
                                                }

                                                {(meeting.profileDto.id !== parseInt(localStorage.getItem("userId"))) &&
                                                (<button
                                                    onClick={() => self.joinMeeting(meeting.id)}
                                                    className="btn btn-success">
                                                    {meeting.thisUserJoins && (<span>isteğimi iptal et</span>) }
                                                    {!meeting.thisUserJoins && (<span>katılmak istiyorum</span>) }
                                                </button>)
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    <hr/>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    }
}

export default Dashboard;