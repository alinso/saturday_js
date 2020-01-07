import React from "react";


class ActivityEditButtonsMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        if (this.props.userId === parseInt(localStorage.getItem("userId"))) {
            return (<div className={"float-right"}>
                    <a href={"/activityRequests/" + this.props.activityId}>
                        <button className="btn btn-success meetingProcess">
                            <i className="fas fa-users"/>
                        </button>
                    </a>
                    <a href={"/invite/" + this.props.activityId}>
                        <button
                            className="btn btn-warning meetingProcess"><i className="fas fa-plus"/>
                        </button>
                    </a>

                    <a href={"/updateActivity/" + this.props.activityId}>
                        <button onClick={this.props.updateDiscover}
                                className="btn btn-info meetingProcess"><i className="fas fa-edit"/>
                        </button>
                    </a>
                    <button onClick={this.props.deleteActivity}
                            className="btn btn-warning meetingProcess"><i className="fas fa-trash"/>
                    </button>


                </div>
            )
        } else {
            return "";
        }
    }
}


export default ActivityEditButtonsMobile;

