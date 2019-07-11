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
            loading:true,
            noMoreRecords: false
        };
        axios.get(Globals.serviceUrl+'notification/newNotifications/', Security.authHeader())
            .then(function (response) {
                if(response.data.length>0)
                    window.location="/notifications";
            });

        this.loadMore = this.loadMore.bind(this);
        this.fillPage = this.fillPage.bind(this);
        this.fillPage(localStorage.getItem("cityId"));
        this.loadCities();





        self = this;
        window.onscroll = function (ev) {
            if( window.scrollY % 10 ===0){
                console.log(window.scrollY);
                localStorage.setItem("scroll",window.scrollY.toString());
            }
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-100)) {
                self.loadMore();
            }
        };
    }



    async loadMore() {
        const self = this;
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        console.log("loaded more");
        await axios.get(Globals.serviceUrl + 'activity/findAllByCityId/' + this.state.city.value + "/" + newPageNum, Security.authHeader())
            .then(function (response) {

                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }

                let newActivities = self.state.activities;
                newActivities = newActivities.concat(response.data);
                self.setState({activities: newActivities});
                localStorage.setItem("pageNum",newPageNum);

            });
    }

    async loadPages(pageNum){
        console.log("pagenum"+pageNum);
         for(let i=0;i<pageNum;i++){
             await  this.loadMore();
        }


    }

    fillPage(cityId) {
        const self = this;

        axios.get(Globals.serviceUrl + 'activity/findAllByCityId/' + cityId + "/0", Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});


                let pageNum = localStorage.getItem("pageNum");
                let scrollY=localStorage.getItem("scroll");
                if(pageNum>0){
                    self.loadPages(pageNum).then(function () {
                        window.scrollTo(0,parseInt(scrollY));
                        setTimeout(function () {
                            window.scrollTo(0,parseInt(scrollY));
                        },1000);
                        self.setState({"loading":false});
                    });
                }else{
                    setTimeout(function () {
                        window.scrollTo(0,parseInt(scrollY));
                        self.setState({"loading":false});
                    },1000);
                }
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

    scrollTop(){
        window.scroll(0,0);
        localStorage.setItem("pageNum","0");
        localStorage.setItem("scroll","0");

    }


    render() {
        const self = this;
        let pageOpacity=0;
        return (

            <div className="full-width container">
                {!this.state.loading && (
                    pageOpacity=true)
                }
                {this.state.loading && (
                    <span>Yükleniyor...</span>
                    )}

                <div style={{opacity:pageOpacity}}>
                    <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>

                    <hr/>
                    <strong><a href={"/top100"}><i className="fas fa-trophy"/> TOP 100</a></strong><br/><br/>
                    <strong><a href={"/help"}><i className="fas fa-star">Activity Friend Game Night</i></a></strong><br/>
                    <strong><a href={"/help2"}><i className="fas fa-star">Mesaj sistemi değişiyor</i></a></strong><br/>

                    <hr/>

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

                <div className={"scrollTopMobile"}>
                    <span onClick={this.scrollTop}><i className="fas fa-arrow-alt-circle-up scrollTopArrow"></i></span>
                </div>
                <br/><br/>
                </div>
            </div>
        )
    }
}

export default DashboardMobile;