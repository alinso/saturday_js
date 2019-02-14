import React from "react";
import Globals from "../util/Globals";
import Security from "../security/Security";

const axios = require('axios');


class ADashboard extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {};
        this.loadPage();

    }

    loadPage() {
        let self = this;
        axios.get(Globals.serviceUrl + 'sdklsdf/dashboard', Security.authHeader())
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    render() {

        return (
            <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                    <span>admin</span>
                    <a href={"/sgjklnmf/eventList"}>Etkinlikler</a>
                </div>
            </div>

        );
    }
}


export default ADashboard;