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

        this.state = {
            meetingsCreated: [],
            meetingsJoined: [],
            meetings: [],
            meetingTypes: "created",
            createdTitle: "activeTitle",
            joinedTitle: "passiveTitle",
        };
        this.fillPage();
        this.changeType = this.changeType.bind(this);
    }

    changeType(type) {
        let meetings = [];
        let createdTitle = "";
        let joinedTitle = "";

        if (type === "created") {
            meetings = this.state.meetingsCreated;
            createdTitle = "activeTitle";
            joinedTitle = "passiveTitle";
        } else if (type === "joined") {
            meetings = this.state.meetingsJoined;
            createdTitle = "passiveTitle";
            joinedTitle = "activeTitle";
        }

        this.setState({meetings: meetings});
        this.setState({createdTitle: createdTitle});
        this.setState({joinedTitle: joinedTitle});

    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/meeting/findByUserId/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                let meetingsCreated = [];
                let meetingsJoined = [];
                response.data.map(function (meeting) {
                    if (meeting.profileDto.id == self.props.match.params.id)
                        meetingsCreated.push(meeting);
                    if (meeting.profileDto.id != self.props.match.params.id)
                        meetingsJoined.push(meeting);
                });
                self.setState({meetingsCreated: meetingsCreated});
                self.setState({meetingsJoined: meetingsJoined});
                self.setState({meetings: meetingsCreated});

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    render() {


        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-5 m-x-auto container">
                    {this.state.meetingsCreated[0] && (
                        <h5><a href={"/profile/" + this.props.match.params.id} className={"profileTitle"}>
                            <i className="fas fa-comments"/>
                            {self.state.meetingsCreated[0].profileDto.name + " " + self.state.meetingsCreated[0].profileDto.surname}
                        </a> bugüne kadar neler yaptı?
                        </h5>
                    )}

                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <hr/>
                        </div>
                        <div className="col-md-6 m-auto">
                            <span className={this.state.createdTitle}
                                  onClick={() => this.changeType("created")}> Oluşturduğu ({this.state.meetingsCreated.length}) </span>&nbsp;&nbsp;
                            <span className={this.state.joinedTitle}
                                  onClick={() => this.changeType("joined")}> Katıldığı ({this.state.meetingsJoined.length})</span>
                        </div>
                        <div className={"col-md-12"}>
                            <hr/>
                        </div>

                    </div>
                    {
                        self.state.meetings.map(function (meeting, i) {
                            return (
                                <div className={"row meetingListSingleMeetingContainer"}>
                                    <div className="col-md-2 meetingListProfile">
                                        <ProfilePic
                                            userId={meeting.profileDto.id}
                                            profilePicName={meeting.profileDto.profilePicName}
                                            cssClass={"profilePicMedium"}
                                        />

                                    </div>
                                    <div className={"col-md-10  text-align-left "}>
                                        <UserFullName
                                            name={meeting.profileDto.name}
                                            userId={meeting.profileDto.id}
                                            surname={meeting.profileDto.surname}
                                        />
                                        <MeetingInfoBlock photoName={meeting.photoName} detail={meeting.detail}/>
                                        <div className={"row"}>
                                            <div className={"col-md-8 meetingDeadLine"}>
                                                <button className={"btn btn-warning"}> {meeting.deadLineString}</button>
                                            </div>
                                            <div className={"col-md-3"}>
                                                <MeetingEditButtons
                                                    meetingId={meeting.id}
                                                    userId={meeting.profileDto.id}
                                                    deleteMeeting={() => self.deleteMeeting(meeting.id)}
                                                />
                                                {(!meeting.expired) &&
                                                (<MeetingRequestButtons
                                                    userId={meeting.profileDto.id}
                                                    joinMeeting={() => self.joinMeeting(meeting.id)}
                                                    thisUserJoined={meeting.thisUserJoined}
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