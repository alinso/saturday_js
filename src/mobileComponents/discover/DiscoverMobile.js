import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";

const axios = require('axios');


class DiscoverMobile extends React.Component {
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

        const {discover} = this.state;
        return (
            <div className="full-width container">
                <div>
                    <h4>{discover.title}</h4>
                    <img src={"/upload/" + discover.photoName} className={"meetingListPhoto"}/><br/><br/>
                    <span  className={"breakLine"}>{discover.detail}</span><br/><br/>
                    {(discover.youtube!=="") && (
                    <iframe width="100%" height="260px" src={"https://www.youtube.com/embed/" + discover.youtube}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                    )}
                    <br/><br/>
                    <span className={"discoverInfo"}>Bu sayfanın amacı sana fikir vermek,<br/> her ziyaretinde yeni bir içerik göreceksin</span>
                    <br/><br/>
                </div>
            </div>

        );
    }
}


export default DiscoverMobile;