import React from "react";
import Security from "../security/Security";
import ProfilePic from "./common/ProfilePic";
import UserFullName from "./common/UserFullName";
import BaseActivityList from "./activity/Base/BaseActivityList";
import ActivityEditButtons from "./common/ActivityEditButtons";
import ActivityRequestButtons from "./common/ActivityRequestButtons";
import ActivityInfoBlock from "./common/ActivityInfoBlock";
import CityUtil from "../util/CityUtil";
import Select from 'react-select'
import Globals from "../util/Globals";
import AlertMobile from "../mobileComponents/common/AlertMobile";

const axios = require('axios');
let self;

class Dashboard extends BaseActivityList {
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

        axios.get(Globals.serviceUrl+'activity/findAllByCityId/' + cityId, Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    loadCities() {
        const self = this;
        axios.get(Globals.serviceUrl+'city/all/', Security.authHeader())
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
                            <div className={"float-left city-filter-label"}> Şehir Filtresi:&nbsp;</div>
                            <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                        <hr/>
                    </div>
                    {(localStorage.getItem("cityId") === "null") &&
                    (<AlertMobile
                    type={"alert-warning"}
                    message={"Varsayılan şehrin için Profilim->Bilgilerim kısmından şehir seçimi yapmalısın!"}
                    />)
                    }
                    {
                        self.state.activities.map(function (activity, i) {
                            return (
                                <div key={i} className={"row meetingListSingleMeetingContainer"}>
                                    <div className="col-md-2 col-sm-2 meetingListProfile">
                                        <ProfilePic
                                            userId={activity.profileDto.id}
                                            profilePicName={activity.profileDto.profilePicName}
                                            cssClass={"profilePicSmall"}
                                        />

                                    </div>
                                    <div className={"col-md-10 text-align-left"}>
                                        <UserFullName
                                            userId={activity.profileDto.id}
                                            profilePicName={activity.profileDto.profilePicName}
                                            name={activity.profileDto.name}
                                            surname={activity.profileDto.surname}
                                        />
                                        <ActivityInfoBlock
                                            photoName={activity.photoName}
                                            detail={activity.detail}
                                            hashtags={activity.hashtagListString}
                                        />
                                        <div className={"row"}>
                                            <div className={"col-md-6 meetingDeadLine"}>
                                                <i className="far fa-clock">{activity.deadLineString}</i>
                                            </div>
                                            <div className={"col-md-4"}>
                                                <ActivityEditButtons
                                                    activityId={activity.id}
                                                    userId={activity.profileDto.id}
                                                    deleteActivity={() => self.deleteActivity(activity.id)}
                                                />
                                                <ActivityRequestButtons
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

export default Dashboard;