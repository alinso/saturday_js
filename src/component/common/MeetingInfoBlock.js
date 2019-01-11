import React from "react";


class MeetingInfoBlock extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return(<div className={"meetingListMeetingDetail"}>
                {this.props.detail}

            {(this.props.photoName!=null) &&(
                <div className={"col-md-12"}>
                    <img className={"meetingListPhoto"} src={"/upload/"+this.props.photoName}/>
                </div>
            )}

        </div>)
    }
}


export default MeetingInfoBlock;

