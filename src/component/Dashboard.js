import React from "react";
import Security from "../security/Security";
import UserUtil from "../util/UserUtil";
import ProfilePic from "./common/ProfilePic";
import UserFullName from "./common/UserFullName";
import BaseMeetingList from "./meeting/BaseMeetingList";
import MeetingEditButtons from "./common/MeetingEditButtons";
import MeetingRequestButtons from "./common/MeetingRequestButtons";
import MeetingInfoBlock from "./common/MeetingInfoBlock";

const axios = require('axios');


class Dashboard extends BaseMeetingList {
    constructor() {
        super();

        this.fillPage();
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
                                        <MeetingInfoBlock
                                            photoName={meeting.photoName}
                                            detail={meeting.detail}
                                        />

                                        <div className={"row"}>
                                            <div className={"col-md-9 meetingListUserMeta"}>
                                                <button className={"btn btn-warning"}> {meeting.deadLineString}</button>
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
                                                <MeetingEditButtons
                                                        meetingId={meeting.id}
                                                        userId={meeting.profileDto.id}
                                                        deleteMeeting={()=>self.deleteMeeting(meeting.id)}
                                                        updateMeeting={()=>self.updateMeeting(meeting.id)}
                                                    />
                                                <MeetingRequestButtons
                                                userId={meeting.profileDto.id}
                                                joinMeeting={() => self.joinMeeting(meeting.id)}
                                                thisUserJoined ={meeting.thisUserJoined}
                                                />

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