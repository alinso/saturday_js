import React from "react";
import Security from "../../../security/Security";
import JSUtil from "../../../util/JSUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');


class BaseActivityListMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();



        this.deleteActivity = this.deleteActivity.bind(this);
        this.joinActivity = this.joinActivity.bind(this);
    }


    joinActivity(id){
        const self = this;

        let activities = self.state.activities;
        let currentMeetingOld = activities.filter(obj => {
            return obj.id === id
        });
        let question="Bu aktiviteye katılmak istediğinden emin misin?";
        if(currentMeetingOld[0].thisUserJoined)
            question="Bu isteği iptal edeceksin, emin misin?";

        let result=window.confirm(question);
        if(!result)
            return;

        axios.get(Globals.serviceUrl+'request/sendRequest/'+id, Security.authHeader())
            .then(function (response) {
                let currentMeetingNew  =Object.assign({},currentMeetingOld)[0];
                currentMeetingNew.thisUserJoined = response.data;

                let indexOfChanged = 0;
                activities.map(function (meeting,index) {
                   if(meeting.id===id)
                       indexOfChanged=index;
                });
                activities[indexOfChanged] = currentMeetingNew;
                self.setState({activities:activities});
            })
            .catch(function (error) {
                alert(error.response.data.userWarningMessage);
            });
    }


    deleteActivity(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtiniz?"))
            return;

        axios.get(Globals.serviceUrl+"activity/delete/" + id, Security.authHeader())
            .then(res => {

                let meetings = self.state.activities;
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings,"id",id );
                self.setState({activities: meetingsNew});
            }).catch(function (error) {
            alert(error.response.data.userWarningMessage);

        });
    }

}

export default BaseActivityListMobile;