import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import '../../util/JSUtil';
import BaseMeetingList from "./Base/BaseMeetingList";
import MeetingEditButtons from "../common/MeetingEditButtons";
import MeetingRequestButtons from "../common/MeetingRequestButtons";
import MeetingInfoBlock from "../common/MeetingInfoBlock";

const axios = require('axios');

class UserMeetings extends BaseMeetingList {
    constructor(props) {
        super(props);

        this.state={
            meetings: []
        }
        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/meeting/findByUserId/'+this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({
                    meetings: response.data,
                });
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }


    render(){

        const self=this;
        return(
            <div className="row">
                <div className="col-md-6 m-auto">
                    {this.state.meetings[0] &&(
                       <div> <UserFullName
                            name={self.state.meetings[0].profileDto.name}
                            userId={self.state.meetings[0].profileDto.id}
                            surname={self.state.meetings[0].profileDto.surname}
                       /><h4>Buluşmalar</h4>
                       </div>
                    )}


                    {
                        self.state.meetings.map(function (meeting, i) {
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
                                        <MeetingInfoBlock photoName={meeting.photoName} detail={meeting.detail}/>
                                        <div className={"row"}>
                                            <div className={"col-md-9 meetingListUserMeta"}>
                                                <button className={"btn btn-warning"}> {meeting.deadLineString}</button>
                                            </div>
                                            <div className={"col-md-3"}>
                                                <MeetingEditButtons
                                                    meetingId={meeting.id}
                                                    userId={meeting.profileDto.id}
                                                    deleteMeeting={()=>self.deleteMeeting(meeting.id)}
                                                />
                                                {(!meeting.expired) &&
                                                    ( <MeetingRequestButtons
                                                        userId={meeting.profileDto.id}
                                                        joinMeeting={() => self.joinMeeting(meeting.id)}
                                                        thisUserJoined ={meeting.thisUserJoined}
                                                    />)
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


export default UserMeetings;