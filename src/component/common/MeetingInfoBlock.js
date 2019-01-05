import React from "react";


class MeetingInfoBlock extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return(<div className={"row meetingListMeetingText"}>
            {(this.props.photoName!=null) &&(
                <div className={"col-md-12"}>
                    <img className={"meetingListPhoto col-md-8"} src={"/upload/"+this.props.photoName}/><hr/><br/>
                </div>
            )}

            <div className={"col-md-12"}>
                {this.props.detail}
            </div>
        </div>)
    }
}


export default MeetingInfoBlock;

