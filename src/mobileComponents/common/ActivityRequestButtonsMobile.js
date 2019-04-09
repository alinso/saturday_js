import React from "react";


class ActivityRequestButtonsMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        if (this.props.userId !== parseInt(localStorage.getItem("userId"))) {
            return (
                <div>
                    {this.props.thisUserJoined && (<button
                            onClick={() => this.props.joinActivity()}
                            className="btn btn-danger">
                            <span><i
                                className="fas fa-times"/>&nbsp;istek gönderdin</span>
                        </button>
                    )}
                    {!this.props.thisUserJoined && (<button
                        onClick={() => this.props.joinActivity()}
                        className="btn btn-success">
                        <span className={""}><i className="fas fa-mug-hot"/>&nbsp; katıl</span>
                    </button>)}
                </div>)
        }
        else {
            return "";
        }
    }
}


export default ActivityRequestButtonsMobile;

