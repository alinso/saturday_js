import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import MeetingInfoBlock from "../common/MeetingInfoBlock";
import MeetingRequestButtons from "../common/MeetingRequestButtons";
import UserUtil from "../../util/UserUtil";

const axios = require('axios');


class MeetingDetail extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state = {
            meeting: {},
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/meeting/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({meeting: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    joinMeeting(id) {
        const self = this;
        axios.get('http://localhost:8080/request/sendRequest/' + id, Security.authHeader())
            .then(function (response) {

                let currentMeetingNew = Object.assign({}, self.state.meeting);
                currentMeetingNew.thisUserJoined = response.data;

                self.setState({meeting: currentMeetingNew});
            });

    }

    render() {
        const {meeting} = this.state;
        const self = this;


        console.log(meeting);
        if (meeting.profileDto !== undefined) {
            return (
                <div className={"row outer"}>
                    <div className={"col-md-6 container"}>
                        <div className={"row"}>
                            <div className="col-md-2 meetingListProfile">
                                <ProfilePic
                                    cssClass={"profilePicMedium"}
                                    userId={meeting.profileDto.id}
                                    profilePicName={meeting.profileDto.profilePicName}
                                />
                            </div>
                            <div className={"col-md-9 text-align-left"}>
                                <UserFullName
                                    name={meeting.profileDto.name}
                                    userId={meeting.profileDto.id}
                                    surname={meeting.profileDto.surname}
                                />
                                <MeetingInfoBlock photoName={meeting.photoName} detail={meeting.detail}/>
                                <div className={"row"}>
                                    <div className={"col-md-9 meetingListUserMeta"}>
                                        <button className={"btn btn-warning"}> {meeting.deadLineString}</button>
                                    </div>
                                    <div className={"col-md-3"}>
                                        {(!meeting.expired) &&
                                        (<MeetingRequestButtons
                                            userId={meeting.profileDto.id}
                                            joinMeeting={() => self.joinMeeting(meeting.id)}
                                            thisUserJoined={meeting.thisUserJoined}
                                        />)
                                        }
                                        {(meeting.expired) &&
                                        (<a href={"/meetingDetail/" + meeting.id}>
                                            <button className={"btn btn-warning"}><i className="fas fa-users"/>Katılanlar
                                            </button>
                                        </a>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className={"col-md-12"}>
                            Aktiviteye Katılanlar
                            <hr/>
                            <div className={"row"}>
                                {(meeting.attendants) &&
                                meeting.attendants.map(function (attendant) {

                                    return (

                                        <div className={"col-md-3"}>
                                            <ProfilePic
                                                userId={attendant.id}
                                                profilePicName={attendant.profilePicName}
                                                cssClass={"profilePicMedium"}
                                            />
                                            <UserFullName
                                                userId={attendant.id}
                                                name={attendant.name}
                                                surname={attendant.surname}
                                            />
                                            {UserUtil.translateGender(attendant.gender)} / {attendant.age}
                                            <br/>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (meeting.profileDto === undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default MeetingDetail;