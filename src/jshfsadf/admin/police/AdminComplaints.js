import React from "react";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";
import AdminMenu from "../AdminMenu";

const axios = require('axios/index');


class AdminComplaints extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            complainList:[],
            errors: {},
        };
        this.getComplaints = this.getComplaints.bind(this);
        this.getComplaints();
    }



    getComplaints() {
        let self = this;
        axios.get(Globals.serviceUrl + Globals.adminUrl + 'allComplaints/', Security.authHeader())
            .then(function (response) {
                self.setState({"complainList": response.data});
            });
    }

    render() {


        return (
            <div className="full-width container">
                <AdminMenu/>
                <h4>Şikayet Listesi</h4>

                {this.state.complainList.map(function(c) {
                    return (
                        <div>{
                   c.reporter.name + " "+c.reporter.surname+"("+c.reporter.id+") , "+  c.guilty.name+ " " + c.guilty.surname+"("+c.guilty.id
                   +") hakkında, -- " +c.detail+ " -- şeklinde şikayette bulundu"}
                        <br/>
                        </div>
                            )
                })
                }


                <br/>
            </div>

        );
    }


}

export default AdminComplaints;