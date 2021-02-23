import React from "react";
import Security from "../security/Security";
import BaseEventList from "./event/Base/BaseEventList";
import CityUtil from "../util/CityUtil";
import Select from 'react-select'
import Globals from "../util/Globals";
import Alert from "./common/Alert";
import EventListItem from "./common/event/EventListItem";


const axios = require('axios');
let self;

class Dashboard extends BaseEventList {
    constructor() {
        super();

        this.state = {
            events: [],
            // userCount: 0,
            maleCount: 0,
            femaleCount: 0,
            cities: [],
            city: {},
            noevent:false,
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
        // this.loadCount = this.loadCount.bind(this);
        //   this.loadCount();

        let cityId = localStorage.getItem("cityId");
        // if (cityId === "null") {
        //     cityId = 1;
        // }

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
                if(!self.state.noMoreRecords)
                self.loadMore();
            }
        };
    }


    async loadMore() {
        const self = this;
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        let cityId;
        if(this.state.city.value==undefined)
            cityId=1;
        else
            cityId=this.state.city.value;

        await axios.get(Globals.serviceUrl + 'event/findByInterestByCityId/' +  cityId+ "/" + newPageNum, Security.authHeader())
            .then(function (response) {

                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }

                let newevents = self.state.events;
                newevents = newevents.concat(response.data);
                self.setState({events: newevents});
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

        axios.get(Globals.serviceUrl + 'event/findByInterestByCityId/' + cityId + "/0", Security.authHeader())
            .then(function (response) {
                self.setState({events: response.data});

                if (response.data.length === 0) {
                    self.setState({noevent: true});
                    self.setState({"loading": false});
                    self.setState({"noMoreRecords": true});

                    return;
                }


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
        // axios.get(Globals.serviceUrl + 'discover/findRandom', Security.authHeader())
        //     .then(function (response) {
        //         self.setState({sponsor: response.data});
        //     })
        //     .catch(function (error) {
        //     });
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
                    <div className={"half-left"}>
                        <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                    </div>
                    <div className={"clear-both"}/>
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

                    {this.state.sponsor && localStorage.getItem("cityId") != "4" && (
                        <div className={"eventListeventDetailMobile"}>
                            {this.state.sponsor.photoName != null &&
                            (<img src={'/upload/' + this.state.sponsor.photoName} width={"100%"}/>)
                            }
                            {this.state.sponsor.detail}
                        </div>
                    )}

                    <hr/>
                    {this.state.noevent && (
                        <span>
                            Eğer seçmediysen <a href={"/interests"}>BURAYA TIKLAYIP</a> ilgi alanlarını seçmelisin. <br/>
                            Eğer seçtiysen sen bir aktivite oluştur. Unutma, seninle aynı şeylere ilgi duyan birrrsürü insan aktivite açmanı bekliyor.
                        </span>
                    )}

                    {
                        self.state.events.map(function (event, i) {
                            return (
                                <EventListItem event={event}
                                               deleteevent={self.deleteevent}
                                               joinevent={self.joinevent}
                                               voteEvent={self.voteEvent}
                                />
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

export default Dashboard;