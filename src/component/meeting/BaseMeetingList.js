import React from "react";
import Security from "../../security/Security";
import JSUtil from "../../util/JSUtil";

const axios = require('axios');


class BaseMeetingList extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();



        this.fillPage();
        this.deleteMeeting = this.deleteMeeting.bind(this);
        this.updateMeeting = this.updateMeeting.bind(this);
        this.joinMeeting = this.joinMeeting.bind(this);
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
                currentMeetingNew.thisUserJoined = response.data;
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings,"id",id );
                meetingsNew.push(currentMeetingNew);

                meetingsNew.sort(JSUtil.compareByDeadLineString);

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
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings,"id",id );
                self.setState({meetings: meetingsNew});
            });
    }

    updateMeeting(id) {
        window.location = "/updateMeeting/" + id;
    }


}

export default BaseMeetingList;