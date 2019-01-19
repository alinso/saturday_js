import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import '../../util/JSUtil';
import BaseActivityListMobile from "./Base/BaseActivityListMobile";
import ActivityEditButtonsMobile from "../common/ActivityEditButtonsMobile";
import ActivityRequestButtonsMobile from "../common/ActivityRequestButtonsMobile";
import ActivityInfoBlockMobile from "../common/ActivityInfoBlockMobile";
import UserUtil from "../../util/UserUtil";

const axios = require('axios');

class UserActivitiesMobile extends BaseActivityListMobile {
    constructor(props) {
        super(props);
        UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            activitiesCreated: [],
            activitiesJoined: [],
            activities: [],
            activityTypes: "created",
            creator: {},
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
        axios.get('http://localhost:8080/activity/findByUserId/' + this.props.match.params.id, Security.authHeader())
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


        axios.get('http://localhost:8080/user/profile/' + this.props.match.params.id, Security.authHeader())
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
            <div className="full-width container">
                {this.state.activitiesCreated[0] && (
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitle"}>
                        <i className="fas fa-comments"/>
                        {self.state.creator.name + " " + self.state.creator.surname}
                    </a> bugüne kadar neler yaptı?
                    </h6>
                )}
                {!this.state.activitiesCreated[0] && (
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitle"}>
                        <i className="fas fa-comments"/>
                        {self.state.creator.name + " " + self.state.creator.surname}
                    </a> henüz bir aktiviteye katılmamış :(
                    </h6>
                )}

                <hr/>
                <div className="text-align-center">
                            <span className={this.state.createdTitle}
                                  onClick={() => this.changeType("created")}> Oluşturduğu ({this.state.activitiesCreated.length}) </span>&nbsp;&nbsp;
                    <span className={this.state.joinedTitle}
                          onClick={() => this.changeType("joined")}> Katıldığı ({this.state.activitiesJoined.length})</span>
                </div>
                <hr/>

                {
                    self.state.activities.map(function (activity, i) {
                        return (
                            <div className={"row meetingListSingleMeetingContainer"}>
                                <div className="float-left">
                                    <ProfilePicMobile
                                        userId={activity.profileDto.id}
                                        profilePicName={activity.profileDto.profilePicName}
                                        cssClass={"profilePicSmall"}
                                    />
                                </div>
                                <div className={"activityListDetailContainer float-left text-align-left"}>
                                    <UserFullNameMobile
                                        name={activity.profileDto.name}
                                        userId={activity.profileDto.id}
                                        surname={activity.profileDto.surname}
                                    />
                                    <ActivityInfoBlockMobile
                                        photoName={activity.photoName}
                                        detail={activity.detail}/>
                                    <br/>
                                    <div className={"float-left"}>
                                        <i className="far fa-clock">{activity.deadLineString}</i>
                                    </div>
                                        <ActivityEditButtonsMobile
                                            activityId={activity.id}
                                            userId={activity.profileDto.id}
                                            deleteActivity={() => self.deleteActivity(activity.id)}
                                        />
                                        {(!activity.expired) &&
                                        (<ActivityRequestButtonsMobile
                                            userId={activity.profileDto.id}
                                            joinMeeting={() => self.joinActivity(activity.id)}
                                            thisUserJoined={activity.thisUserJoined}
                                        />)
                                        }
                                        <br/><br/>
                                        {(activity.expired) &&
                                        (<a href={"/activityDetail/" + activity.id} className={"float-right"}>
                                            <button className={"btn btn-warning"}><i className="fas fa-users"/>Katılanlar
                                            </button>

                                        </a>)
                                        }
                                </div>

                                <hr/>
                            </div>
                        );
                    })}
            </div>
        )
    }

}


export default UserActivitiesMobile;