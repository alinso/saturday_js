import React from "react";
import Security from "../security/Security";
import UserUtil from "../util/UserUtil";

const axios = require('axios');


class Dashboard extends React.Component {
    constructor() {
        super();
        Security.protect();

        this.state = {
            meetings: []
        };

        this.fillPage();
        this.deleteMeeting = this.deleteMeeting.bind(this);
        this.updateMeeting = this.updateMeeting.bind(this);
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

    deleteMeeting(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtiniz?"))
            return;

        axios.get("http://localhost:8080/meeting/delete/" + id, Security.authHeader())
            .then(res => {

                let meetings = self.state.meetings;
                let deletedIndex = -1;
                meetings.forEach(function (meeting, index) {
                    if (meeting.id == id) {
                        deletedIndex = index;
                    }
                });

                if (deletedIndex > -1) {
                    meetings.splice(deletedIndex, 1);
                }
                self.setState({meetings: meetings});
            });
    }

    updateMeeting(id) {
        window.location = "/updateMeeting/" + id;
    }


    render() {
        const self = this;
        return (
            <div className="row">
                <div className="col-md-8 m-auto">
                    {
                        self.state.meetings.map(function (meeting, i) {
                            return (
                                <div className={"row meetingListSingleMeetingContainer"}>
                                    <div className="col-md-3 meetingListProfile">
                                        <a className={"userListUserName"} href={"/profile/" + meeting.profileDto.id}>
                                            <img className={"profilePic"}
                                                 src={UserUtil.buildProfilePicUrl(meeting.profileDto.profilePicName)}/><br/>
                                            {meeting.profileDto.name} {meeting.profileDto.surname}</a>
                                    </div>
                                    <div className={"col-md-9 "}>
                                        <div className={"row meetingListMeetingText"}>
                                            {meeting.detail}
                                        </div>
                                        <div className={"row"}>
                                            <div className={"col-md-9 meetingListUserMeta"}>
                                                <strong>
                                                    {UserUtil.translateGender(meeting.profileDto.gender)} / {meeting.profileDto.age}
                                                </strong>
                                                &nbsp;&nbsp;&nbsp;
                                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i
                                                className="fas fa-star"></i><i className="fas fa-star"></i><i
                                                className="fas fa-star"></i>(37)
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