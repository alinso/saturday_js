import React from "react";


class ActivityRequestButtonsMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        if (this.props.userId !== parseInt(localStorage.getItem("userId"))) {
            return (
                <button
                    onClick={() => this.props.joinActivity()}
                    className="btn btn-success">
                    {this.props.thisUserJoined && (<span><i className="fas fa-times"/>&nbsp; isteğimi iptal et</span>)}
                    {!this.props.thisUserJoined && (<span><i className="fas fa-arrow-right"/>&nbsp; birlikte yapalım!</span>)}
                </button>
            )
        }
        else {
            return "";
        }
    }
}


export default ActivityRequestButtonsMobile;

