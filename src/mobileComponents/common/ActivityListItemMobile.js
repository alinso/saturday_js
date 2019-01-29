import ProfilePicMobile from "./ProfilePicMobile";
import UserFullNameMobile from "./UserFullNameMobile";
import ActivityInfoBlockMobile from "./ActivityInfoBlockMobile";
import ActivityEditButtonsMobile from "./ActivityEditButtonsMobile";
import ActivityRequestButtonsMobile from "./ActivityRequestButtonsMobile";
import React from "react";


class ActivityListItemMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div className={"row meetingListSingleMeetingContainer"}>
                <div className="float-left">
                    <ProfilePicMobile
                        userId={this.props.activity.profileDto.id}
                        profilePicName={this.props.activity.profileDto.profilePicName}
                        cssClass={"profilePicSmallMobile"}
                    />
                </div>
                <div className={"activityListDetailContainerMobile float-left text-align-left"}>
                    <UserFullNameMobile
                        user={this.props.activity.profileDto}
                    />
                    <ActivityInfoBlockMobile
                        photoName={this.props.activity.photoName}
                        detail={this.props.activity.detail}
                        hashtagListString={this.props.activity.hashtagListString}
                    />
                    <br/>
                    <div className={"float-left"}>
                        <i className="far fa-clock">{this.props.activity.deadLineString}</i>
                    </div>
                    <ActivityEditButtonsMobile
                        activityId={this.props.activity.id}
                        userId={this.props.activity.profileDto.id}
                        deleteActivity={() => this.props.deleteActivity(this.props.activity.id)}
                    />
                    {(!this.props.activity.expired) &&
                    (<div className={"float-right"}>

                        <ActivityRequestButtonsMobile
                            userId={this.props.activity.profileDto.id}
                            joinActivity={() => this.props.joinActivity(this.props.activity.id)}
                            thisUserJoined={this.props.activity.thisUserJoined}
                        />
                    </div>)
                    }
                    <br/><br/>
                    {(this.props.activity.expired) &&
                    (<a href={"/activityDetail/" + this.props.activity.id} className={"float-right"}>
                        <button className={"btn btn-warning"}><i className="fas fa-users"/>Katılanlar
                        </button>

                    </a>)
                    }
                </div>

            </div>
        )

    }
}


export default ActivityListItemMobile;


