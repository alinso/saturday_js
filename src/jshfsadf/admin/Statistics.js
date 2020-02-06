import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";

const axios = require('axios');


class Statistics extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        this.state={
            aasMale:null,
            aasFemale:null,
            registeredWomen:null,
            maleCount:null,
            femaleCount:null,
            activeMaleCount:null,
            activeFemaleCount:null,
            tooActiveMaleCount:null,
            tooActiveFemaleCount:null
        };

        this.fillPage();
    }


    fillPage() {
        let self = this;
        axios.get(Globals.serviceUrl + 'statistics/aasFemale', Security.authHeader())
            .then(function (response) {
                self.setState({aasFemale: response.data});
            });
        axios.get(Globals.serviceUrl + 'statistics/aasMale', Security.authHeader())
            .then(function (response) {
                self.setState({aasMale: response.data});
            });
        axios.get(Globals.serviceUrl + 'statistics/maleCount', Security.authHeader())
            .then(function (response) {
                self.setState({maleCount: response.data});
            });
        axios.get(Globals.serviceUrl + 'statistics/femaleCount', Security.authHeader())
            .then(function (response) {
                self.setState({femaleCount: response.data});
            });
        axios.get(Globals.serviceUrl + 'statistics/activeMaleCount', Security.authHeader())
            .then(function (response) {
                self.setState({activeMaleCount: response.data});
            });
        axios.get(Globals.serviceUrl + 'statistics/activeFemaleCount', Security.authHeader())
            .then(function (response) {
                self.setState({activeFemaleCount: response.data});
            });
        axios.get(Globals.serviceUrl + 'statistics/tooActiveMaleCount', Security.authHeader())
            .then(function (response) {
                self.setState({tooActiveMaleCount: response.data});
            });
        axios.get(Globals.serviceUrl + 'statistics/tooActiveFemaleCount', Security.authHeader())
            .then(function (response) {
                self.setState({tooActiveFemaleCount: response.data});
            });






        axios.get(Globals.serviceUrl + 'statistics/registeredWomen', Security.authHeader())
            .then(function (response) {
                self.setState({registeredWomen: response.data});
            });
    }


    render() {

        return (
            <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                        AAS
                        <hr/>
                        <span>Kadın {this.state.aasFemale}, &nbsp;&nbsp; </span>
                        <span>Erkek {this.state.aasMale} </span>
                    <br/>
                    <br/>
                    Yeni Kadın Üyeler
                    <hr/>
                    {this.state.registeredWomen!=null && this.state.registeredWomen.map(function (womenCount) {
                        return (<span>{womenCount}, </span>)
                    })}
                    <br/><br/>
                    Kullanıcı Sayıları(Ankara)
                    <hr/>
                    Kadın:{this.state.femaleCount} <br/>
                    Erkek:{this.state.maleCount}<br/>
                    0 puan üstü Kadın:{this.state.activeFemaleCount}<br/>
                    0 puan üstü Erkek:{this.state.activeMaleCount}<br/>
                    20 puan üstü Kadın:{this.state.tooActiveFemaleCount}<br/>
                    20 puan üstü Erkek:{this.state.tooActiveMaleCount}<br/>
                </div>
            </div>

        );
    }
}


export default Statistics;