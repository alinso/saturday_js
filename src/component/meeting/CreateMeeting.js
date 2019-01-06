import React from "react";
import Security from "../../security/Security";
import "../../react-datetime.css";
import BaseMeetingForm from "./BaseMeetingForm";
const moment=require("moment");
const axios = require('axios');


class CreateMeeting extends BaseMeetingForm{
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.getInitDeadLine = this.getInitDeadLine.bind(this);
    }

    createMeeting(newMeeting) {
        console.log(newMeeting);
        let self = this;
        axios.post('http://localhost:8080/meeting/create', newMeeting, Security.authHeader())
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

    getInitDeadLine(){
        if(this.state.deadLineString==="")
            return new Date(Date.now());
        else
            return this.state.deadLineString;
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({isSubmitDisabled: true});

        const data = new FormData();
        if (this.state.selectedFile != null)
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);


        data.append("detail", this.state.detail);
        data.append("deadLineString",this.state.deadLineString);
        this.createMeeting(data);
    }

}


export default CreateMeeting;