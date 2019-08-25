import React from "react";
import Security from "../../../security/Security";
import CityUtil from "../../../util/CityUtil";
import Globals from "../../../util/Globals";
import BaseDiscoverForm from "./BaseDiscoverForm";

const axios = require('axios/index');


class ADiscoverUpdate extends BaseDiscoverForm {
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

               //all cities
                let citiesWithAll  = [];
                const allCities =  {"value":0,"label":"Tüm Şehirler"};
                citiesWithAll.push(allCities);
                citiesWithAll = citiesWithAll.concat(result.cities);
                //all cities finish

                self.setState({cities:citiesWithAll});
            })
            .catch(function (error) {
            });

    }

    fillPage() {
        const self = this;

        axios.get(Globals.serviceUrl+'discover/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({title: response.data.title});
                self.setState({photoName: response.data.photoName});
                self.setState({id: response.data.id});
                self.setState({youtube: response.data.youtube});
                if(response.data.city!==null)
                    self.setState({city:{label:response.data.city.name, value: response.data.city.id}});
                else
                    self.setState({city:{label:"Tüm Şehirler", value: 0}});

            });

    }

    updateDiscover(discover) {
        console.log(discover);
        let self = this;
        axios.post(Globals.serviceUrl+Globals.adminUrl+'updateDiscover', discover, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Kaydedildi"});
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
        data.append("title", this.state.title);
        data.append("cityId", this.state.city.value);
        data.append("id", this.props.match.params.id);
        data.append("youtube", this.state.youtube);

        this.updateDiscover(data);
    }

}

export default ADiscoverUpdate;