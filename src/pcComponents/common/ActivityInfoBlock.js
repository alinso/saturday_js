import React from "react";


class ActivityInfoBlock extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return(<div className={"activityListActivityDetail"}>
                {this.props.detail}

            {(this.props.photoName!=null) &&(
                <div className={"col-md-12"}>
                    <img className={"meetingListPhoto"} src={"/upload/"+this.props.photoName}/>
                </div>
            )}

        </div>)
    }
}


export default ActivityInfoBlock;

