import React from "react";
import Security from "../../../security/Security";
import JSUtil from "../../../util/JSUtil";

const axios = require('axios');


class BaseMeetingList extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();



        this.deleteMeeting = this.deleteMeeting.bind(this);
        this.joinMeeting = this.joinMeeting.bind(this);
    }


    joinMeeting(id){
        const self = this;
        axios.get('http://localhost:8080/request/sendRequest/'+id, Security.authHeader())
            .then(function (response) {
                let meetings = self.state.meetings;
                let currentMeetingOld = meetings.filter(obj => {
                    return obj.id === id
                });
                let currentMeetingNew  =Object.assign({},currentMeetingOld)[0];
                currentMeetingNew.thisUserJoined = response.data;

                let indexOfChanged = 0;
                meetings.map(function (meeting,index) {
                   if(meeting.id===id)
                       indexOfChanged=index;
                });
                meetings[indexOfChanged] = currentMeetingNew;
                self.setState({meetings:meetings});
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
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings,"id",id );
                self.setState({meetings: meetingsNew});
            });
    }

}

export default BaseMeetingList;