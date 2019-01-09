import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import MeetingInfoBlock from "../common/MeetingInfoBlock";
import MeetingRequestButtons from "../common/MeetingRequestButtons";
const axios = require('axios');


class MeetingDetail extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state={
            meeting:{},
            erorrs:{}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/meeting/findById/'+this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({meeting: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    render() {
        const {meeting}  =this.state;
        const self = this;

        if(meeting.profileDto!==undefined){
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
                {
                    meeting.attendants.map(function (attendant) {
                        return(<h4>{attendant.name}</h4>)
                    })
                }
            </div>
        )}
        if(meeting.profileDto===undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default MeetingDetail;