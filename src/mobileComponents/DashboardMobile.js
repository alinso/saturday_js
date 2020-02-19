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
            // userCount: 0,
            maleCount: 0,
            femaleCount: 0,
            cities: [],
            city: {},
            sponsor: false,
            attendanceRate: 0,
            pageNum: 0,
            loading: true,
            noMoreRecords: false
        };
        axios.get(Globals.serviceUrl + 'notification/newNotifications/', Security.authHeader())
            .then(function (response) {
                if (response.data.length > 0)
                    window.location = "/notifications";
            });

        this.loadMore = this.loadMore.bind(this);
        this.fillPage = this.fillPage.bind(this);
        this.loadCount = this.loadCount.bind(this);
        this.loadCount();

        let cityId = localStorage.getItem("cityId");
        if (cityId === "null") {
            cityId = 1;
        }
        this.fillPage(cityId);

        this.loadCities();


        let isScrolling = false;
        window.addEventListener('scroll', function (event) {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
                localStorage.setItem("scroll", window.scrollY.toString());
            }, 300);

        }, false);

        self = this;
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
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
                localStorage.setItem("pageNum", newPageNum);

            });
    }


    loadCount() {
        axios.get(Globals.serviceUrl + 'user/maleCount/', Security.authHeader())
            .then(function (response) {
                self.setState({maleCount: response.data});
            });
        axios.get(Globals.serviceUrl + 'user/femaleCount/', Security.authHeader())
            .then(function (response) {
                self.setState({femaleCount: response.data});
            });
    }

    async loadPages(pageNum) {
        console.log("pagenum" + pageNum);
        for (let i = 0; i < pageNum; i++) {
            await this.loadMore();
        }


    }

    fillPage(cityId) {
        const self = this;

        axios.get(Globals.serviceUrl + 'activity/findAllByCityId/' + cityId + "/0", Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});


                let pageNum = localStorage.getItem("pageNum");
                let scrollY = localStorage.getItem("scroll");
                if (pageNum > 0) {
                    self.loadPages(pageNum).then(function () {
                        window.scrollTo(0, parseInt(scrollY));
                        setTimeout(function () {
                            window.scrollTo(0, parseInt(scrollY));
                        }, 1000);
                        self.setState({"loading": false});
                    });
                } else {
                    setTimeout(function () {
                        window.scrollTo(0, parseInt(scrollY));
                        self.setState({"loading": false});
                    }, 1000);
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
        axios.get(Globals.serviceUrl + 'discover/findRandom', Security.authHeader())
            .then(function (response) {
                self.setState({sponsor: response.data});
            })
            .catch(function (error) {
            });
        axios.get(Globals.serviceUrl + 'user/userAttendanceRate/' + localStorage.getItem("userId"), Security.authHeader())
            .then(function (response) {
                self.setState({attendanceRate: response.data});
            })
            .catch(function (error) {
            });

        // axios.get(Globals.serviceUrl + 'user/userCount', Security.authHeader())
        //     .then(function (response) {
        //         self.setState({userCount: response.data});
        //     })
        //     .catch(function (error) {
        //     });
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

    scrollTop() {
        window.scroll(0, 0);
        localStorage.setItem("pageNum", "0");
        localStorage.setItem("scroll", "0");

    }


    render() {
        const self = this;
        let pageOpacity = 0;
        let kadin = 16000 - this.state.femaleCount;
        let erkek = 4000 - this.state.maleCount;
        return (

            <div className="full-width container">
                {!this.state.loading && (
                    pageOpacity = true)
                }
                {this.state.loading && (
                    <span>Yükleniyor...</span>
                )}

                {localStorage.getItem("cityId") === "null" && (

                    <a href={"updateInfo/"}>
                        <div className="alert alert-primary" role="alert">
                            <strong><i className="fas fa-map-marker-alt"/> Yaşadığın şehri seçmek için tıkla</strong>
                        </div>
                        <br/>
                    </a>
                )}

                <div style={{opacity: pageOpacity}}>
                    <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>

                    <hr/>
                    <strong><a href={"/top100"}><i className="fas fa-trophy"/> TOP 100</a></strong><br/><br/>
                    <strong><a href={"/help"}>
                        <button className={"btn btn-success"}> Premium Ol!</button>
                    </a></strong><br/>

                    <hr/>
                    <span>İlgini çeken bir aktivite yoksa kendi aktiviteni oluştur, her konuda sana eşlik edecek insanlar burada!</span><br/>
                    <a href="/createActivity">
                        <button className={"btn btn-primary"}>Bir Aktivite Oluştur</button>
                    </a>
                    <br/>
                    <hr/>
                    <h5>Ankara Toplam Üye Sayısı</h5>
                    <span>Ankara'da toplam en fazla 20.000 üye olabilmesi kararı aldık. Şehrin en nezih 20.000 kişisini topluluğumuza dahil ettikten sonra diğer şehirlerden büyümeye devam
                        edeceğiz. Kaliteyi en yüksek seviyede tutabilmek için kullanıcı sayısına bu limiti getirdik. Ankara toplam kullanıcı sayısı hiçbir zaman 20.001 olmayacak ve limite ulaştığımızda
                    sayımızı değil, kalitemizi yükseltmeye odaklı çalışmalar yapacağız. Aşağıda kadın ve erkek için kalan kontenjanları canlı olarak ayrı ayrı görebilirsiniz</span>
                    <br/>
                    <strong> Kadın Kontenjanı :{kadin} (Toplam 16.000)</strong>
                    <br/>
                    <strong>Erkek Kontenjanı :{erkek} (Toplam 4.000)</strong>
                    <hr/>
                    {this.state.attendanceRate > 3 && this.state.attendanceRate < 70 && (
                        (
                            <div className={"full-width warning"}>
                                Onaylandığın aktivitelere katılım oranın düşük, lütfen sadece katılmayı düşündüğün
                                aktivitelere istek gönder.
                                Onaylandığın zaman gerçekten planlarını ona göre yapan ve seni bekleyen insanlar var!

                            </div>
                        )
                    )}
                    <br/>

                    {this.state.sponsor && localStorage.getItem("cityId") != "4" && (
                        <div className={"activityListActivityDetailMobile"}>
                            {this.state.sponsor.photoName != null &&
                            (<img src={'/upload/' + this.state.sponsor.photoName} width={"100%"}/>)
                            }
                            {this.state.sponsor.detail}
                        </div>
                    )}

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

export default DashboardMobile;