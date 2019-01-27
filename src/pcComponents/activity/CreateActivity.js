import React from "react";
import Security from "../../security/Security";
import "../../react-datetime.css";
import BaseActivityForm from "./Base/BaseActivityForm";
import CityUtil from "../../util/CityUtil";
import Globals from "../../util/Globals";

const axios = require('axios');
const moment = require('moment');


class CreateActivity extends BaseActivityForm{
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadCities();
    }

    loadCities(){
        const self=this;
        axios.get(Globals.serviceUrl+'city/all/', Security.authHeader())
            .then(function (response) {
                let result =CityUtil.setCitiesForSelect(response.data);
                self.setState({cities:result.cities});
                self.setState({city:result.selectedCity});
            })
            .catch(function (error) {
            });

    }

    createActivity(newActivity) {
        let self = this;
        console.log(newActivity);
        axios.post(Globals.serviceUrl+'activity/create', newActivity, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Kaydedildi, iyi eğlenceler :)"});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
                self.setState({isFileSelected:false});
            });
    }


    onSubmit(e) {
        e.preventDefault();

        this.setState({isSubmitDisabled: true});

        const deadLineString  =this.state.deadLine.date+" "+this.state.deadLine.hour.value+":"+this.state.deadLine.minute.value;


        const data = new FormData();
        if (this.state.selectedFile != null)
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);

        data.append("cityId",this.state.city.value);
        data.append("detail", this.state.detail);
        data.append("hashtagListString", this.state.hashtagListString);
        data.append("deadLineString",deadLineString);
        this.createActivity(data);
    }

}


export default CreateActivity;