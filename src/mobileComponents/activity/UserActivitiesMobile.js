import React from "react";
import Security from "../../security/Security";
import '../../util/JSUtil';
import BaseActivityListMobile from "./Base/BaseActivityListMobile";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";
import ActivityListItemMobile from "../common/ActivityListItemMobile";

const axios = require('axios');

class UserActivitiesMobile extends BaseActivityListMobile {
    constructor(props) {
        super(props);
        UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            activitiesJoinedCount:0,
            activitiesCreatedCount:0,
            noMoreRecords:false,
            activities: [],
            type: "created",
            creator: {},
            createdTitle: "activeTitle",
            joinedTitle: "passiveTitle",
            pageNum:0,
        };
        this.loadMore = this.loadMore.bind(this);
        this.changeType = this.changeType.bind(this);
        this.activityCounts=this.activityCounts.bind(this);

        this.activityCounts();
        this.fillPage("created",0);

       let self = this;
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
                self.loadMore();
            }
        };
    }

     loadMore() {
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
         this.fillPage(this.state.type,newPageNum);
    }

    changeType(type) {
        let createdTitle = "";
        let joinedTitle = "";
        this.setState({activities:[]});
        this.setState({type:type});
        this.setState({pageNum:0});
        this.fillPage(type,0);
        if (type === "created") {
            createdTitle = "activeTitle";
            joinedTitle = "passiveTitle";
        } else if (type === "joined") {
            createdTitle = "passiveTitle";
            joinedTitle = "activeTitle";
        }
        this.setState({createdTitle: createdTitle});
        this.setState({joinedTitle: joinedTitle});

    }

    activityCounts(){
        let self=this;
        axios.get(Globals.serviceUrl + 'activity/createdAndJoinedCount/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({activitiesCreatedCount: response.data[0]});
                self.setState({activitiesJoinedCount: response.data[1]});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    fillPage(type,newPageNum) {
        const self = this;

        axios.get(Globals.serviceUrl + 'user/profile/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({creator: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

        //yasin
        if(this.props.match.params.id==2534){
            return;
        }
        axios.get(Globals.serviceUrl + 'activity/findByUserId/' + this.props.match.params.id+"/"+newPageNum+"/"+type, Security.authHeader())
            .then(function (response) {

                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }
                let newActivities = self.state.activities;
                newActivities = newActivities.concat(response.data);
                self.setState({activities: newActivities});

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    render() {


        const self = this;
        return (
            <div className="full-width container">
                {(this.state.creator.activityCount>0) && (
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
                        <i className="fas fa-comments"/>
                        {self.state.creator.name + " " + self.state.creator.surname}
                    </a> bugüne kadar neler yaptı?
                    </h6>
                )}
                {(this.state.creator.activityCount==0) && (
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
                        <i className="fas fa-comments"/>
                        {self.state.creator.name + " " + self.state.creator.surname}
                    </a> henüz bir aktiviteye katılmamış :(
                    </h6>
                )}

                <hr/>
                <div className="text-align-center">
                            <span className={this.state.createdTitle}
                                  onClick={() => this.changeType("created")}> Oluşturduğu ({this.state.activitiesCreatedCount}) </span>&nbsp;&nbsp;
                    <span className={this.state.joinedTitle}
                          onClick={() => this.changeType("joined")}> Katıldığı ({this.state.activitiesJoinedCount})</span>
                </div>
                <hr/>

                {
                    self.state.activities.map(function (activity, i) {
                        return (
                            <ActivityListItemMobile activity={activity} deleteActivity={self.deleteActivity}
                                              joinActivity={self.joinActivity}/>

                        );
                    })}
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>
            </div>
        )
    }

}


export default UserActivitiesMobile;