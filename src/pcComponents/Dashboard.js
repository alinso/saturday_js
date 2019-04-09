import React from "react";
import Security from "../security/Security";
import BaseActivityList from "./activity/Base/BaseActivityList";
import CityUtil from "../util/CityUtil";
import Select from 'react-select'
import Globals from "../util/Globals";
import AlertMobile from "../mobileComponents/common/AlertMobile";
import ActivityListItem from "./common/ActivityListItem";

const axios = require('axios');
let self;

class Dashboard extends BaseActivityList {
    constructor() {
        super();

        this.state = {
            activities: [],
            cities: [],
            city: {},
            pageNum: 0,
            noMoreRecords: false
        };

        this.fillPage = this.fillPage.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.loadCities();
        this.fillPage(localStorage.getItem("cityId"));
        self = this;
        window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            self.loadMore();
            }
        };
    }

    fillPage(cityId) {
        const self = this;

        axios.get(Globals.serviceUrl + 'activity/findAllByCityId/' + cityId+ "/0", Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    loadMore() {
        console.log(this.state.city);

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
            <div className="row outer">
                <div className="col-md-5 m-x-auto container">
                    <div className={"col-md-6 m-auto"}>
                        <div className={"float-left city-filter-label"}> Şehir Filtresi:&nbsp;</div>
                        <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                        <hr/>
                    </div>
                    {(localStorage.getItem("cityId") === "null") &&

                    (<a href="/updateInfo"> <div className={"alert alert-danger"}>
                        Akışı görebilmek için Profilim->Bilgilerim kısmından ŞEHİR  ve TELEFON bilgisi girmelisin</div></a>)
                    }
                    {
                        self.state.activities.map(function (activity, i) {
                            return (
                                <ActivityListItem activity={activity} deleteActivity={self.deleteActivity}
                                                  joinActivity={self.joinActivity}/>
                            );
                        })}
                        <br/>
                    <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha fazla göster...</button>
                </div>
            </div>
        )
    }
}

export default Dashboard;