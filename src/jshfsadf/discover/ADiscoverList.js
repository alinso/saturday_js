import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import AdminMenu from "../AdminMenu";

const axios = require('axios');


class ADiscoverList extends React.Component {
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
        axios.get(Globals.serviceUrl + 'discover/findNonExpiredDiscovers', Security.authHeader())
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
            <div className="row adminOuter">
                <AdminMenu/>
                <div className={"col-md-6"}>
                    <a href={"/sgjklnmf/discoverCreate"}>Yeni Keşfet Ekle</a>
                    {
                        this.state.events.map(function (event, i) {
                            return (
                                <div>
                                    <h4>{event.title}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        );
    }
}


export default ADiscoverList;