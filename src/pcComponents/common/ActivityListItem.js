import React from "react";
import ProfilePic from "./ProfilePic";
import UserFullName from "./UserFullName";
import ActivityInfoBlock from "./ActivityInfoBlock";
import ActivityEditButtons from "./ActivityEditButtons";
import ActivityRequestButtons from "./ActivityRequestButtons";


class ActivityListItem extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return( <div className={"row meetingListSingleMeetingContainer"}>
            <div className="col-md-2 col-sm-2 meetingListProfile">
                <ProfilePic
                    userId={this.props.activity.profileDto.id}
                    profilePicName={this.props.activity.profileDto.profilePicName}
                    cssClass={"profilePicSmall"}
                />

            </div>
            <div className={"col-md-10 text-align-left"}>
                <UserFullName
                    user={this.props.activity.profileDto}
                />
                <ActivityInfoBlock
                    photoName={this.props.activity.photoName}
                    detail={this.props.activity.detail}
                    hashtagListString={this.props.activity.hashtagListString}
                />
                <div className={"row"}>
                    <div className={"col-md-6 meetingDeadLine"}>
                        <i className="far fa-clock">{this.props.activity.deadLineString}</i>
                    </div>
                    <div className={"col-md-4"}>
                        <ActivityEditButtons
                            activityId={this.props.activity.id}
                            userId={this.props.activity.profileDto.id}
                            deleteActivity={() => this.props.deleteActivity(this.props.activity.id)}
                        />
                        {(!this.props.activity.expired) &&
                        (<ActivityRequestButtons
                            userId={this.props.activity.profileDto.id}
                            joinActivity={() => this.props.joinActivity(this.props.activity.id)}
                            thisUserJoined={this.props.activity.thisUserJoined}
                        />)
                        }
                        <br/>
                        {(this.props.activity.expired) &&
                        (<a href={"/activityDetail/" + this.props.activity.id}>
                            <button className={"btn btn-warning"}><i className="fas fa-users"/>Katılanlar
                            </button>

                        </a>)
                        }



                    </div>
                </div>
            </div>

            <hr/>
        </div>)
    }
}


export default ActivityListItem;

