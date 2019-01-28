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
import Globals from "../util/Globals";
import AlertMobile from "./common/AlertMobile";
import ActivityListItem from "../pcComponents/common/ActivityListItem";
import ActivityListItemMobile from "./common/ActivityListItemMobile";

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
            <div className="full-width container">
                <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                <hr/>
                {(localStorage.getItem("cityId") === "null") &&
                (<AlertMobile
                    type={"alert-warning"}
                    message={"Profilim->Bilgilerim kısmından şehir seçimi yapmalısın!"}
                />)
                }
                {
                    self.state.activities.map(function (activity, i) {
                        return (
                            <ActivityListItemMobile activity={activity} deleteActivity={self.deleteActivity} joinActivity={self.joinActivity}/>
                        );
                    })}
            </div>
        )
    }
}

export default DashboardMobile;