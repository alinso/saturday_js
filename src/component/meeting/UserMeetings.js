import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import '../../util/JSUtil';
import JSUtil from "../../util/JSUtil";

const axios = require('axios');

class UserMeetings extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            meetings: [],
            user:false
        }
        this.fillPage();
    }



    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/meeting/findByUserId/'+this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({
                    meetings: response.data,
                    user:response.data[0].profileDto
                });
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
                //let deletedIndex = -1;
                // meetings.forEach(function (meeting, index) {
                //     if (meeting.id == id) {
                //         deletedIndex = index;
                //     }
                // });
                //
                // if (deletedIndex > -1) {
                //     meetings.splice(deletedIndex, 1);
                // }
                //
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings,"id",id );


                self.setState({meetings: meetingsNew});
            });
    }

    updateMeeting(id) {
        window.location = "/updateMeeting/" + id;
    }


    render(){

        const self=this;
        return(
            <div className="row">
                <div className="col-md-6 m-auto">
                    {this.state.user &&(
                       <div> <UserFullName
                            name={self.state.meetings[0].profileDto.name}
                            userId={self.state.meetings[0].profileDto.id}
                            surname={self.state.meetings[0].profileDto.surname}
                       /><h4>Buluşmalar</h4></div>
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


export default UserMeetings;