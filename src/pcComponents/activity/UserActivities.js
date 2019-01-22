import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import '../../util/JSUtil';
import BaseActivityList from "./Base/BaseActivityList";
import ActivityEditButtons from "../common/ActivityEditButtons";
import ActivityRequestButtons from "../common/ActivityRequestButtons";
import ActivityInfoBlock from "../common/ActivityInfoBlock";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');

class UserActivities extends BaseActivityList {
    constructor(props) {
        super(props);
        UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            activitiesCreated: [],
            activitiesJoined: [],
            activities: [],
            activityTypes: "created",
            creator:{},
            createdTitle: "activeTitle",
            joinedTitle: "passiveTitle",
        };
        this.fillPage();
        this.changeType = this.changeType.bind(this);
    }

    changeType(type) {
        let activities = [];
        let createdTitle = "";
        let joinedTitle = "";

        if (type === "created") {
            activities = this.state.activitiesCreated;
            createdTitle = "activeTitle";
            joinedTitle = "passiveTitle";
        } else if (type === "joined") {
            activities = this.state.activitiesJoined;
            createdTitle = "passiveTitle";
            joinedTitle = "activeTitle";
        }

        this.setState({activities: activities});
        this.setState({createdTitle: createdTitle});
        this.setState({joinedTitle: joinedTitle});

    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl+'activity/findByUserId/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                let activitiesCreated = [];
                let activitiesJoined = [];
                response.data.map(function (activity) {
                    if (activity.profileDto.id == self.props.match.params.id)
                        activitiesCreated.push(activity);
                    if (activity.profileDto.id != self.props.match.params.id)
                        activitiesJoined.push(activity);
                });
                self.setState({activitiesCreated: activitiesCreated});
                self.setState({activitiesJoined: activitiesJoined});
                self.setState({activities: activitiesCreated});

            })
            .catch(function (error) {
                console.log(error.response);
            });


        axios.get(Globals.serviceUrl+'user/profile/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({creator: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    render() {


        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-5 m-x-auto container">
                    {this.state.activitiesCreated[0] && (
                        <h5><a href={"/profile/" + this.props.match.params.id} className={"profileTitle"}>
                            <i className="fas fa-comments"/>
                            {self.state.creator.name + " " + self.state.creator.surname}
                        </a> bugüne kadar neler yaptı?
                        </h5>
                    )}
                    {!this.state.activitiesCreated[0] && (
                        <h5><a href={"/profile/" + this.props.match.params.id} className={"profileTitle"}>
                            <i className="fas fa-comments"/>
                            {self.state.creator.name + " " + self.state.creator.surname}
                        </a> henüz bir aktiviteye katılmamış :(
                        </h5>
                    )}

                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <hr/>
                        </div>
                        <div className="col-md-6 m-auto">
                            <span className={this.state.createdTitle}
                                  onClick={() => this.changeType("created")}> Oluşturduğu ({this.state.activitiesCreated.length}) </span>&nbsp;&nbsp;
                            <span className={this.state.joinedTitle}
                                  onClick={() => this.changeType("joined")}> Katıldığı ({this.state.activitiesJoined.length})</span>
                        </div>
                        <div className={"col-md-12"}>
                            <hr/>
                        </div>

                    </div>
                    {
                        self.state.activities.map(function (activity, i) {
                            return (
                                <div className={"row meetingListSingleMeetingContainer"}>
                                    <div className="col-md-2 meetingListProfile">
                                        <ProfilePic
                                            userId={activity.profileDto.id}
                                            profilePicName={activity.profileDto.profilePicName}
                                            cssClass={"profilePicSmall"}
                                        />

                                    </div>
                                    <div className={"col-md-10  text-align-left "}>
                                        <UserFullName
                                            name={activity.profileDto.name}
                                            userId={activity.profileDto.id}
                                            surname={activity.profileDto.surname}
                                        />
                                        <ActivityInfoBlock photoName={activity.photoName} detail={activity.detail}/>
                                        <div className={"row"}>
                                            <div className={"col-md-6 meetingDeadLine"}>
                                                <button className={"btn btn-warning"}> {activity.deadLineString}</button>
                                            </div>
                                            <div className={"col-md-3"}>
                                                <ActivityEditButtons
                                                    activityId={activity.id}
                                                    userId={activity.profileDto.id}
                                                    deleteActivity={() => self.deleteActivity(activity.id)}
                                                />
                                                {(!activity.expired) &&
                                                (<ActivityRequestButtons
                                                    userId={activity.profileDto.id}
                                                    joinMeeting={() => self.joinActivity(activity.id)}
                                                    thisUserJoined={activity.thisUserJoined}
                                                />)
                                                }
                                                <br/>
                                                {(activity.expired) &&
                                                (<a href={"/activityDetail/" + activity.id}>
                                                    <button className={"btn btn-warning"}><i className="fas fa-users"/>Katılanlar
                                                    </button>

                                                </a>)
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    <hr/>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    }

}


export default UserActivities;