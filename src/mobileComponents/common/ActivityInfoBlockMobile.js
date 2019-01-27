import React from "react";


class ActivityInfoBlockMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        let hashtags = [];
        if (this.props.hashtags != null) {
            hashtags = this.props.hashtags.split("#");
            console.log(this.props.hashtagListString);
        }


        return (<div className={"activityListActivityDetailMobile"}>
            {this.props.detail}
            <br/>
            {hashtags.map(function (tag) {
                    if (tag !== "")
                        return (<a>{"#" + tag}</a>)
                }
            )}

            {(this.props.photoName != null) && (
                <div className={"full-width"}>
                    <img className={"meetingListPhoto"} src={"/upload/" + this.props.photoName}/>
                </div>
            )}

        </div>)
    }
}


export default ActivityInfoBlockMobile;

