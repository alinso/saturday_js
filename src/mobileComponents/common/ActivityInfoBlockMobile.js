import React from "react";


class ActivityInfoBlockMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        let hashtags = [];
        if (this.props.hashtagListString != null) {
            hashtags = this.props.hashtagListString.split("#");
        }


        return (<div className={"activityListActivityDetailMobile"}>
            {this.props.detail}
            <br/>
            {hashtags.map(function (tag) {
                    if (tag !== "")
                        return (<div className={"float-left"}><a href={"/hashtagActivity/"+tag}>{"#" + tag}</a></div>)
                }
            )}
            <div className={"clear-both"}></div>

            {(this.props.photoName != null) && (
                <div className={"full-width"}>
                    <img className={"meetingListPhoto"} src={"/upload/" + this.props.photoName}/>
                </div>
            )}

        </div>)
    }
}


export default ActivityInfoBlockMobile;

