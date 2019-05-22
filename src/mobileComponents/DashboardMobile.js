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
            userCount: 0,
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
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-100)) {
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

                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }

                let newActivities = self.state.activities;
                newActivities = newActivities.concat(response.data);
                self.setState({activities: newActivities});
            });
    }

    fillPage(cityId) {
        const self = this;

        axios.get(Globals.serviceUrl + 'activity/findAllByCityId/' + cityId + "/0", Security.authHeader())
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

        axios.get(Globals.serviceUrl + 'user/userCount', Security.authHeader())
            .then(function (response) {
                self.setState({userCount: response.data});
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
        self.setState({pageNum: 0});
        self.setState({noMoreRecords: false});
    }


    render() {
        const self = this;
        return (
            <div className="full-width container">


                <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                <hr/>
                <strong><a href={"/top100"}><i className="fas fa-trophy"/> TOP 100</a></strong><br/><br/>
                <strong><a href={"/help"}><i className="fab fa-gripfire"/>Tanrılar kan istiyor</a></strong><br/>
                <strong><a href={"/help2"}>@activityfriend</a></strong><br/>

                <hr/>
                {(localStorage.getItem("cityId") === "null") &&
                (<a href="/updateInfo">
                    <div className={"alert alert-danger"}>
                        Akışı görebilmek için buraya tıklayıp ŞEHİR ve TELEFON bilgisi girmelisin
                    </div>
                </a>)
                }

                {
                    self.state.activities.map(function (activity, i) {
                        return (
                            <ActivityListItemMobile activity={activity} deleteActivity={self.deleteActivity}
                                                    joinActivity={self.joinActivity}/>
                        );
                    })}
                <span className={"discoverInfo"}>Toplam kullanıcı sayısı: {this.state.userCount}</span><br/>
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>
                <br/><br/>

            </div>
        )
    }
}

export default DashboardMobile;