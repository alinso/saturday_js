import React from "react";
import Security from "../security/Security";
import ProfilePicMobile from "./common/ProfilePicMobile";
import UserFullNameMobile from "./common/UserFullNameMobile";
import BaseActivityListMobile from "./activity/Base/BaseActivityListMobile";
import ActivityEditButtonsMobile from "./common/ActivityEditButtonsMobile";
import ActivityRequestButtonsMobile from "./common/ActivityRequestButtonsMobile";
import ActivityInfoBlockMobile from "./common/ActivityInfoBlockMobile";
import CityUtil from "../util/CityUtil";
import Select from 'react-select'

const axios = require('axios');
let self;

class DashboardMobile extends BaseActivityListMobile {
    constructor() {
        super();

        this.state = {
            activities: [],
            cities: [],
            city: {}
        };

        this.fillPage = this.fillPage.bind(this);
        this.fillPage(localStorage.getItem("cityId"));
        this.loadCities();
        self = this;
    }

    fillPage(cityId) {
        const self = this;

        axios.get('http://localhost:8080/activity/findAllByCityId/' + cityId, Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    loadCities() {
        const self = this;
        axios.get('http://localhost:8080/city/all/', Security.authHeader())
            .then(function (response) {
                let result = CityUtil.setCitiesForSelect(response.data);
                self.setState({cities: result.cities});
                self.setState({city: result.selectedCity});
            })
            .catch(function (error) {
            });

    }

    onSelectChange(e) {
        self.fillPage(e.value);
        self.setState({city: e});
    }


    render() {
        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-5 m-x-auto container">
                    <div className={"col-md-6 m-auto"}>
                            <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                        <hr/>
                    </div>
                    {
                        self.state.activities.map(function (activity, i) {
                            return (
                                <div key={i} className={"row meetingListSingleMeetingContainer"}>
                                    <div className="col-md-2 col-sm-2 meetingListProfile">
                                        <ProfilePicMobile
                                            userId={activity.profileDto.id}
                                            profilePicName={activity.profileDto.profilePicName}
                                            cssClass={"profilePicSmall"}
                                        />

                                    </div>
                                    <div className={"col-md-10 text-align-left"}>
                                        <UserFullNameMobile
                                            userId={activity.profileDto.id}
                                            profilePicName={activity.profileDto.profilePicName}
                                            name={activity.profileDto.name}
                                            surname={activity.profileDto.surname}
                                        />
                                        <ActivityInfoBlockMobile
                                            photoName={activity.photoName}
                                            detail={activity.detail}
                                        />
                                        <div className={"row"}>
                                            <div className={"col-md-8 meetingDeadLine"}>
                                                <i className="far fa-clock">{activity.deadLineString}</i>
                                            </div>
                                            <div className={"col-md-4"}>
                                                <ActivityEditButtonsMobile
                                                    activityId={activity.id}
                                                    userId={activity.profileDto.id}
                                                    deleteMeeting={() => self.deleteActivity(activity.id)}
                                                />
                                                <ActivityRequestButtonsMobile
                                                    userId={activity.profileDto.id}
                                                    joinActivity={() => self.joinActivity(activity.id)}
                                                    thisUserJoined={activity.thisUserJoined}
                                                />

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

export default DashboardMobile;