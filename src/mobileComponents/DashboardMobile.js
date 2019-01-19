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
            <div className="full-width container">
                <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                <hr/>
                {
                    self.state.activities.map(function (activity, i) {
                        return (
                            <div key={i} className={"row meetingListSingleMeetingContainer"}>
                                <div className={"float-left"}>
                                    <ProfilePicMobile
                                        userId={activity.profileDto.id}
                                        profilePicName={activity.profileDto.profilePicName}
                                        cssClass={"profilePicSmall"}
                                    />
                                </div>
                                <div className={"float-left activityListDetailContainer text-align-left"}>
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
                                    <br/>
                                    <div className={"float-left"}>
                                        <i className="far fa-clock">{activity.deadLineString}</i>
                                    </div>
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
                                <hr/>
                            </div>
                        );
                    })}
            </div>
        )
    }
}

export default DashboardMobile;