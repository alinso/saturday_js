import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";

const axios = require('axios');


class Discover extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            discover: [],
        };

        this.fillPage();
    }


    fillPage() {
        let self = this;
        axios.get(Globals.serviceUrl + 'discover/findRandom', Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({discover: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }


    render() {

        const {discover}  =this.state;
        return (
            <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                    <div>
                        <hr/>
                        <h4>{discover.title}</h4>
                        <img src={"/upload/"+discover.photoName} className={"discoverPhoto"}/><br/><br/>
                        <span className={"breakLine discoverPhoto"}>{discover.detail}</span><br/><br/>
                        {(discover.youtube!=="") && (
                        <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+discover.youtube} frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                        )}<br/><br/><br/>
                        <span className={"discoverInfo"}>Bu sayfanın amacı sana fikir vermek,<br/> her ziyaretinde yeni bir içerik göreceksin</span>
                    </div>
                </div>
            </div>

        );
    }
}


export default Discover;