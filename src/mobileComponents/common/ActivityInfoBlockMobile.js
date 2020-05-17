import React from "react";


class ActivityInfoBlockMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {



        return (<div className={"activityListActivityDetailMobile"}>
            {this.props.detail}
            <br/>
            {this.props.categories.map(function (tag) {
                        return (<div className={"float-left"}><a href={"/categoryDetail/"+tag.id}>{"#"+tag.name}</a> &nbsp;</div>)
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

