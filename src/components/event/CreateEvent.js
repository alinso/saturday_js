import React from "react";
import Security from "../../security/Security";
import "../../react-datetime.css";
import BaseEventForm from "./Base/BaseEventForm";
import CityUtil from "../../util/CityUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class CreateEvent extends BaseEventForm{
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadCities();
        this.loadInterests();
       // this.checkEventLimit();
    }

    checkEventLimit(){
        const self=this;
        axios.get(Globals.serviceUrl+'premium/checkEvetLimit/', Security.authHeader())
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                self.setState({eventLimitExceeded:error.response.data.userWarningMessage});
            });

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
    loadInterests() {
        const self = this;
        axios.get(Globals.serviceUrl + 'interest/allInterests', Security.authHeader())
            .then(function (response) {
                self.setState({allInterests: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    createevent(newevent) {
        let self = this;
        console.log(newevent);
        axios.post(Globals.serviceUrl+'event/create', newevent, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Kaydedildi, iyi eğlenceler :)"});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                if(error.response.status===500){
                    self.setState({"errors": {file:"Fotoğraf boyutu max 4 MB olabilir"}});
                }
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
        data.append("selectedInterestIds", this.state.selectedInterestIds);
        data.append("deadLineString",deadLineString);
        data.append("secret", this.state.audiance==="mylist");
        this.createevent(data);
    }

}


export default CreateEvent;