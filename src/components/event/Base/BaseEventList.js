import React from "react";
import Security from "../../../security/Security";
import JSUtil from "../../../util/JSUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');


class BaseEventList extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();


        this.deleteevent = this.deleteevent.bind(this);
        this.joinevent = this.joinevent.bind(this);
    }


    joinevent(id) {
        const self = this;

        let events = self.state.events;
        let currentMeetingOld = events.filter(obj => {
            return obj.id === id
        });


        if (Security.isValidToken()) {

            let question = "Bu aktiviteye katılmak istediğinden emin misin?";

            if (currentMeetingOld[0].thisUserJoined === 1 || currentMeetingOld[0].thisUserJoined === 2)
                question = "Bu aktiviteden isteğini geri çekmek istediğine emin misin?";

            let result = window.confirm(question);
            if (!result)
                return;

            axios.get(Globals.serviceUrl + 'request/sendRequest/' + id, Security.authHeader())
                .then(function (response) {
                    let currentMeetingNew = Object.assign({}, currentMeetingOld)[0];
                    currentMeetingNew.thisUserJoined = response.data;

                    let indexOfChanged = 0;
                    events.map(function (meeting, index) {
                        if (meeting.id === id)
                            indexOfChanged = index;
                    });
                    events[indexOfChanged] = currentMeetingNew;
                    self.setState({events: events});
                })
                .catch(function (error) {
                    alert(error.response.data.userWarningMessage);
                });
        }

    }


    deleteevent(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtin?"))
            return;

        axios.get(Globals.serviceUrl + "event/delete/" + id, Security.authHeader())
            .then(res => {

                let meetings = self.state.events;
                let meetingsNew = JSUtil.deleteFromArrayByPropertyName(meetings, "id", id);
                self.setState({events: meetingsNew});
            });
    }

}

export default BaseEventList;