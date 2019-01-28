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
import Globals from "../../util/Globals";
import ActivityListItem from "../../pcComponents/common/ActivityListItem";
import ActivityListItemMobile from "../common/ActivityListItemMobile";

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
        axios.get(Globals.serviceUrl + 'activity/findByUserId/' + this.props.match.params.id, Security.authHeader())
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


        axios.get(Globals.serviceUrl + 'user/profile/' + this.props.match.params.id, Security.authHeader())
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
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
                        <i className="fas fa-comments"/>
                        {self.state.creator.name + " " + self.state.creator.surname}
                    </a> bugüne kadar neler yaptı?
                    </h6>
                )}
                {!this.state.activitiesCreated[0] && (
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
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
                            <ActivityListItemMobile activity={activity} deleteActivity={self.deleteActivity}
                                              joinActivity={self.joinActivity}/>

                        );
                    })}
            </div>
        )
    }

}


export default UserActivitiesMobile;