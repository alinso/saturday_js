import React from "react";
import Globals from "../util/Globals";
import Security from "../security/Security";
import AdminMenu from "./AdminMenu";

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
            <div className="full-width adminOuter">
                <AdminMenu/>
                <div className={"col-md-9"}>
                </div>
            </div>

        );
    }
}


export default ADashboard;