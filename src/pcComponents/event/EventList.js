import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";

const axios = require('axios');


class EventList extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            events: [],
        };

        this.fillPage();
    }


    fillPage() {
        let self = this;
        axios.get(Globals.serviceUrl + 'event/findNonExpiredEvents', Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({events: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }


    render() {

        const {errors} = this.state;


        return (
            <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                    {
                        this.state.events.map(function (event, i) {
                            return (
                                <div>
                                    <h4>{event.title}</h4>
                                    <span>{event.detail}</span><br/>
                                    <span>{event.dtString}</span><br/>
                                    <span>{event.photoName}</span><br/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        );
    }
}


export default EventList;