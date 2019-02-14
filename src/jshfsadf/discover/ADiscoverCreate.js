import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import CityUtil from "../../util/CityUtil";
import BaseDiscoverForm from "./BaseDiscoverForm";

const axios = require('axios');


class ADiscoverCreate extends BaseDiscoverForm {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadCities();
    }

    loadCities() {
        const self = this;
        axios.get(Globals.serviceUrl + 'city/all/', Security.authHeader())
            .then(function (response) {
                let result = CityUtil.setCitiesForSelect(response.data);
                self.setState({cities: result.cities});
                self.setState({city: result.selectedCity});
            })
            .catch(function (error) {
            });

    }

    createDiscover(newDiscover) {
        let self = this;
        console.log(newDiscover);
        axios.post(Globals.serviceUrl + Globals.adminUrl+'createDiscover', newDiscover, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
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

        data.append("cityId", this.state.city.value);
        data.append("detail", this.state.detail);
        data.append("title", this.state.title);
        this.createDiscover(data);
    }

}

export default ADiscoverCreate;