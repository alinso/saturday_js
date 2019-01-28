import React from "react";
import Security from "../../security/Security";
import BaseActivityListMobile from "./Base/BaseActivityListMobile";
import ActivityListItemMobile from "../common/ActivityListItemMobile";
import Globals from "../../util/Globals";
const axios = require('axios');
let self;

class HashtagActivityMobile extends BaseActivityListMobile {
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
            <div className="full-width container">
                    {
                        self.state.activities.map(function (activity, i) {
                            return (
                                <ActivityListItemMobile activity={activity} deleteActivity={self.deleteActivity}
                                                  joinActivity={self.joinActivity}/>
                            );
                        })}
            </div>
        )
    }
}

export default HashtagActivityMobile;