import React from "react";


class ActivityInfoBlockMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

            return(<div className={"activityListActivityDetail"}>
                {this.props.detail}

            {(this.props.photoName!=null) &&(
                <div className={"full-width"}>
                    <img className={"meetingListPhoto"} src={"/upload/"+this.props.photoName}/>
                </div>
            )}

        </div>)
    }
}


export default ActivityInfoBlockMobile;

