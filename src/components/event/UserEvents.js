import React from "react";
import Security from "../../security/Security";
import '../../util/JSUtil';
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";
import EventBlock from "../common/event/EventBlock";

const axios = require('axios');

class UserEvents  extends React.Component{
    constructor(props) {
        super(props)
        Security.protect()
        UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            eventsJoinedCount:0,
            eventsCreatedCount:0,
            noMoreRecords:false,
            events: [],
            type: "created",
            creator: {},
            createdTitle: "activeTitle",
            joinedTitle: "passiveTitle",
            pageNum:0,
        };
        this.loadMore = this.loadMore.bind(this);
        this.changeType = this.changeType.bind(this);
        this.eventCounts=this.eventCounts.bind(this);

        this.eventCounts();
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
        this.setState({events:[]});
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

    eventCounts(){
        let self=this;
        axios.get(Globals.serviceUrl + 'event/createdAndJoinedCount/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({eventsCreatedCount: response.data[0]});
                self.setState({eventsJoinedCount: response.data[1]});
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
        axios.get(Globals.serviceUrl + 'event/findByUserId/' + this.props.match.params.id+"/"+newPageNum+"/"+type, Security.authHeader())
            .then(function (response) {

                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }
                let newevents = self.state.events;
                newevents = newevents.concat(response.data);
                self.setState({events: newevents});

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    render() {


        const self = this;
        return (
            <div className="full-width container">
                {(this.state.creator.eventCount>0) && (
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
                        <i className="fas fa-comments"/>
                        {self.state.creator.name + " " + self.state.creator.surname}
                    </a> bugüne kadar neler yaptı?
                    </h6>
                )}
                {(this.state.creator.eventCount==0) && (
                    <h6><a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
                        <i className="fas fa-comments"/>
                        {self.state.creator.name + " " + self.state.creator.surname}
                    </a> henüz bir aktiviteye katılmamış :(
                    </h6>
                )}

                <hr/>
                <div className="text-align-center">
                            <span className={this.state.createdTitle}
                                  onClick={() => this.changeType("created")}> Oluşturduğu ({this.state.eventsCreatedCount}) </span>&nbsp;&nbsp;
                    <span className={this.state.joinedTitle}
                          onClick={() => this.changeType("joined")}> Katıldığı ({this.state.eventsJoinedCount})</span>
                </div>
                <hr/>

                {
                    self.state.events.map(function (event, i) {
                        return (
                            <EventBlock event={event}/>

                        );
                    })}
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>
            </div>
        )
    }

}


export default UserEvents;