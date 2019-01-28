import React from "react";
import Security from "../../security/Security";
import BaseActivityForm from "./Base/BaseActivityForm";
import CityUtil from "../../util/CityUtil";
import Globals from "../../util/Globals";

const moment=require("moment");
const axios = require('axios');


class UpdateActivity extends BaseActivityForm {
    constructor(props) {
        super(props);
        this.fillPage();
        this.onSubmit = this.onSubmit.bind(this);
        this.loadCities();
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

    fillPage() {
        const self = this;

        axios.get(Globals.serviceUrl+'activity/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({photoName: response.data.photoName});
                self.setState({id: response.data.id});
                self.setState({hashtagListString:response.data.hashtagListString});
                self.setState({city:{label:response.data.city.name, value: response.data.city.id}});

                const dateFromDb = moment(response.data.deadLineString, 'DD/MM/YYYY HH:mm').toDate();
                const hourFromDb = dateFromDb.getHours();
                const minuteFromDb = dateFromDb.getMinutes();

                let formattedDate = moment(dateFromDb).format("DD/MM/YYYY");

                self.setState({deadLine:{date:formattedDate,hour:{label:hourFromDb,value:hourFromDb}, minute:{label:minuteFromDb, value:minuteFromDb}}});

            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    updateActivity(meeting) {
        console.log(meeting);
        let self = this;
        axios.post(Globals.serviceUrl+'activity/update', meeting, Security.authHeader())
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
        data.append("hashtagListString", this.state.hashtagListString);

        this.updateActivity(data);
    }

}

export default UpdateActivity;