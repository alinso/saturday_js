import React from "react";
import Security from "../security/Security";
import BaseActivityListMobile from "./activity/Base/BaseActivityListMobile";
import CityUtil from "../util/CityUtil";
import Select from 'react-select'
import Globals from "../util/Globals";
import AlertMobile from "./common/AlertMobile";
import ActivityListItemMobile from "./common/ActivityListItemMobile";

const axios = require('axios');
let self;

class DashboardMobile extends BaseActivityListMobile {
    constructor() {
        super();

        this.state = {
            activities: [],
            cities: [],
            city: {},
            pageNum: 0,
            noMoreRecords: false

        };

        this.loadMore = this.loadMore.bind(this);
        this.fillPage = this.fillPage.bind(this);
        this.fillPage(localStorage.getItem("cityId"));
        this.loadCities();
        self = this;
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                self.loadMore();
            }
        };

    }
    loadMore() {
        const self = this;
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        axios.get(Globals.serviceUrl + 'activity/findAllByCityId/' + this.state.city.value + "/" + newPageNum, Security.authHeader())
            .then(function (response) {
                console.log(response.data);

                if(response.data.length===0){
                    self.setState({noMoreRecords:true});
                    return;
                }

                let newActivities = self.state.activities;
                newActivities = newActivities.concat(response.data);
                self.setState({activities: newActivities});
            });
    }

    fillPage(cityId) {
        const self = this;

        axios.get(Globals.serviceUrl + 'activity/findAllByCityId/' + cityId+"/0", Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

        axios.get(Globals.serviceUrl + 'm/ok', Security.authHeader())
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
            });
    }

    loadCities() {
        const self = this;
        axios.get(Globals.serviceUrl + 'city/all/', Security.authHeader())
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
        self.setState({pageNum:0});
        self.setState({noMoreRecords:false});
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
                    message={"Akışı görebilmek için Profilim->Bilgilerim kısmından şehir seçimi yapmalısın!"}
                />)
                }
                {
                    self.state.activities.map(function (activity, i) {
                        return (
                            <ActivityListItemMobile activity={activity} deleteActivity={self.deleteActivity}
                                                    joinActivity={self.joinActivity}/>
                        );
                    })}
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha fazla göster...</button>

            </div>
        )
    }
}

export default DashboardMobile;