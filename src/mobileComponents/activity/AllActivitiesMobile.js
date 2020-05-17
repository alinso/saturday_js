import React from "react";
import Security from "../../security/Security";
import BaseActivityListMobile from "../activity/Base/BaseActivityListMobile";
import Globals from "../../util/Globals";
import ActivityListItemMobile from "../common/ActivityListItemMobile";


const axios = require('axios');
let self;

class AllActivitiesMobile extends BaseActivityListMobile {
    constructor() {
        super();

        this.state = {
            activities: [],
            // userCount: 0,
            attendanceRate: 0,
            pageNum: 0,
            loading: true,
            noMoreRecords: false
        };


        this.loadMore = this.loadMore.bind(this);
        this.fillPage = this.fillPage.bind(this);

        this.fillPage();

        self = this;
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
                if(!self.state.noMoreRecords)
                    self.loadMore();
            }
        };
    }


    async loadMore() {
        const self = this;
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        await axios.get(Globals.serviceUrl + 'activity/all/'+ newPageNum, Security.authHeader())
            .then(function (response) {

                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }

                let newActivities = self.state.activities;
                newActivities = newActivities.concat(response.data);
                self.setState({activities: newActivities});
                localStorage.setItem("pageNum", newPageNum);
                self.setState({loading:false});

            });
    }

    fillPage() {
        const self = this;

        axios.get(Globals.serviceUrl + 'activity/all' +  "/0", Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});
                self.setState({loading:false});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    scrollTop() {
        window.scroll(0, 0);
        localStorage.setItem("pageNum", "0");
        localStorage.setItem("scroll", "0");
    }


    render() {
        const self = this;
        return (

            <div className="full-width container">
                {this.state.loading && (
                    <span>Yükleniyor...</span>
                )}

                <div>

                    <a className={"profileTitleMobile"} href={"/"}>Bana Özel</a>
                    <hr/>

                    {
                        self.state.activities.map(function (activity, i) {
                            return (
                                <ActivityListItemMobile activity={activity} deleteActivity={self.deleteActivity}
                                                        joinActivity={self.joinActivity}/>
                            );
                        })}
                    {/*<span className={"discoverInfo"}>Toplam kullanıcı sayısı: {this.state.userCount}</span><br/>*/}
                    <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                        fazla göster...
                    </button>

                    <div className={"scrollTopMobile"}>
                    <span onClick={this.scrollTop}><i
                        className="fas fa-arrow-alt-circle-up scrollTopArrow"/></span>
                    </div>
                    <br/><br/>
                </div>
            </div>
        )
    }
}

export default AllActivitiesMobile;