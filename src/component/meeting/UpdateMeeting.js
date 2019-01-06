import React from "react";
import Security from "../../security/Security";
import BaseMeetingForm from "./BaseMeetingForm";

const moment=require("moment");
const axios = require('axios');


class UpdateMeeting extends BaseMeetingForm {
    constructor(props) {
        super(props);
        this.fillPage();
        this.onSubmit = this.onSubmit.bind(this);
        this.getInitDeadLine = this.getInitDeadLine.bind(this);
    }

    fillPage() {
        const self = this;

        axios.get('http://localhost:8080/meeting/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({deadLineString: response.data.deadLineString});
                self.setState({photoName: response.data.photoName});
                self.setState({id: response.data.id});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }
    getInitDeadLine(){
            if(this.state.deadLineString==="")
                return false;

            return moment(this.state.deadLineString, 'DD/MM/YYYY HH:mm').toDate();
    }

    updateMeeting(meeting) {
        console.log(meeting);
        let self = this;
        axios.post('http://localhost:8080/meeting/update', meeting, Security.authHeader())
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

        const data = new FormData();
        if (this.state.selectedFile != null)
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        data.append("detail", this.state.detail);
        data.append("deadLineString", this.state.deadLineString);
        data.append("id", this.props.match.params.id);

        this.updateMeeting(data);
    }

}

export default UpdateMeeting;