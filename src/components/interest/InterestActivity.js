import React from "react";
import Security from "../../security/Security";
import EventBlock from "../common/event/EventBlock";
import Globals from "../../util/Globals";

const axios = require('axios');

class InterestActivity  extends React.Component {
    constructor(props) {
        super(props)
        Security.protect();
        this.state = {
            activities: [],
            pageNum: 0,
            noMoreRecords: false
        };

        this.loadMore = this.loadMore.bind(this);
        this.fillPage = this.fillPage.bind(this);
        this.fillPage(0);

        let self = this;
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
                self.loadMore();
            }
        };
    }

    fillPage(newPageNum) {
        const self = this;

        axios.get(Globals.serviceUrl + 'category/activities/' + this.props.match.params.id + "/" + newPageNum, Security.authHeader())
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

    async loadMore() {
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        this.fillPage(newPageNum);
    }


    render() {
        const self = this;
        return (
            <div className="full-width container">
                {
                    self.state.activities.length > 0 && self.state.activities.map(function (activity, i) {
                        return (
                            <EventBlock event={activity} />
                        );
                    })}
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>
            </div>
        )
    }
}

export default InterestActivity;