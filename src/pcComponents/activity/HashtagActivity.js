import React from "react";
import Security from "../../security/Security";
import BaseActivityList from "./Base/BaseActivityList";
import Globals from "../../util/Globals";
import ActivityListItem from "../common/ActivityListItem";

const axios = require('axios');
let self;

class HashtagActivity extends BaseActivityList {
    constructor(props) {
        super(props);

        this.state = {
            activities: [],
        };

        this.fillPage = this.fillPage.bind(this);
        this.fillPage();
        self = this;
    }

    fillPage() {
        const self = this;

        axios.get(Globals.serviceUrl + 'hashtag/findActivities/' + this.props.match.params.hashtag, Security.authHeader())
            .then(function (response) {
                self.setState({activities: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    render() {
        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-5 m-x-auto container">
                    {
                        self.state.activities.map(function (activity, i) {
                            return (
                                <ActivityListItem activity={activity} deleteActivity={self.deleteActivity}
                                                  joinActivity={self.joinActivity}/>
                            );
                        })}
                </div>
            </div>
        )
    }
}

export default HashtagActivity;