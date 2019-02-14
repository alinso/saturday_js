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