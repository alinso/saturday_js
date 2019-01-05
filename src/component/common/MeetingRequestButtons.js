import React from "react";


class MeetingRequestButtons extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        if (this.props.userId !== parseInt(localStorage.getItem("userId"))) {
            return (
                <button
                    onClick={() => this.props.joinMeeting()}
                    className="btn btn-success">
                    {this.props.thisUserJoined && (<span>isteğimi iptal et</span>)}
                    {!this.props.thisUserJoined && (<span>katılmak istiyorum</span>)}
                </button>
            )
        }
        else {
            return "";
        }
    }
}


export default MeetingRequestButtons;

