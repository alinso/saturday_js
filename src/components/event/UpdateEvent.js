import React from "react";
import Security from "../../security/Security";
import BaseEventForm from "./Base/BaseEventForm";
import CityUtil from "../../util/CityUtil";
import Globals from "../../util/Globals";

const moment=require("moment");
const axios = require('axios');


class UpdateEvent extends BaseEventForm {
    constructor(props) {
        super(props);
        this.fillPage();
        this.onSubmit = this.onSubmit.bind(this);
        this.loadCities();
        this.loadInterests();
    }

    loadCities(){
        const self=this;
        axios.get(Globals.serviceUrl+'city/all/', Security.authHeader())
            .then(function (response) {
                let result =CityUtil.setCitiesForSelect(response.data);
                self.setState({cities:result.cities});
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

    fillPage() {
        const self = this;

        axios.get(Globals.serviceUrl+'event/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({photoName: response.data.photoName});
                self.setState({id: response.data.id});
                self.setState({city:{label:response.data.city.name, value: response.data.city.id}});
                self.setState({hashtagListString:response.data.hashtagListString});


                const dateFromDb = moment(response.data.deadLineString, 'DD/MM/YYYY HH:mm').toDate();
                const hourFromDb = dateFromDb.getHours();
                const minuteFromDb = dateFromDb.getMinutes();
                let formattedDate = moment(dateFromDb).format("DD/MM/YYYY");
                self.setState({deadLine:{date:formattedDate,hour:{label:hourFromDb,value:hourFromDb}, minute:{label:minuteFromDb, value:minuteFromDb}}});


                let selectedInterestIds = [];
                response.data.interests.map(function (c) {
                    selectedInterestIds.push(c.id);
                });
                self.setState({selectedinterestIds: selectedInterestIds});

            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    updateEvent(event) {
        console.log(event);
        let self = this;
        axios.post(Globals.serviceUrl+'event/update', event, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Kaydedildi, iyi eğlenceler :)"});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
                self.setState({isFileSelected: false});
            });
    }


    onSubmit(e) {
        e.preventDefault();

        this.setState({isSubmitDisabled: true});

        const deadLineString  =this.state.deadLine.date+" "+this.state.deadLine.hour.value+":"+this.state.deadLine.minute.value;

        const data = new FormData();
        if (this.state.selectedFile != null)
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        data.append("detail", this.state.detail);
        data.append("cityId", this.state.city.value);
        data.append("deadLineString", deadLineString);
        data.append("id", this.props.match.params.id);
        data.append("secret", this.state.audiance=="mylist");
        data.append("selectedinterestIds", this.state.selectedinterestIds);

        this.updateEvent(data);
    }

}

export default UpdateEvent;