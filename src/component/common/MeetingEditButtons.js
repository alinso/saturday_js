import React from "react";


class MeetingEditButtons extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        if (this.props.userId === parseInt(localStorage.getItem("userId"))) {
            return (<div className={" row meetingListMeetingEditButtons"}>
                    <a href={"/meetingRequests/" + this.props.meetingId}>
                        <button className="btn btn-success meetingProcess">
                            <i className="fas fa-users"/>
                        </button>
                    </a>
                    <button onClick={this.props.updateMeeting}
                            className="btn btn-info meetingProcess"><i className="fas fa-edit"/>
                    </button>
                    <button onClick={this.props.deleteMeeting}
                            className="btn btn-warning meetingProcess"><i className="fas fa-trash"/>
                    </button>
                </div>
            )
        }
        else{
            return "";
        }
    }
}


export default MeetingEditButtons;

