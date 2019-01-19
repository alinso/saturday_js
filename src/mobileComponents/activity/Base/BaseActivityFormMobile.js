import React from "react";
import Security from "../../../security/Security";
import ActivityDetailInputMobil from "../../common/ActivityDetailInputMobil";
import Datetime from "react-datetime";
import SinglePhotoSelectorMobile from "../../common/SinglePhotoSelectorMobile";
import Select from 'react-select'
import CityUtil from "../../../util/CityUtil";
import AlertMobile from "../../common/AlertMobile";

const moment = require("moment");

const axios = require('axios');


require('moment/locale/tr');


class BaseActivityFormMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            id: null,
            detail: "",
            photoName: null,
            deadLineString: "",
            savedMessage: false,
            selectedFile: null,
            isFileSelected: false,
            isSubmitDisabled: false,
            cities: [],
            city: {},
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.dateSelected = this.dateSelected.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.loadCities = this.loadCities.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);


    }


    dateSelected(e) {
        let selectedDate = e.format("DD/MM/YYYY HH:mm");
        this.setState({deadLineString: selectedDate});
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectChange(e) {
        console.log(e);
        this.setState({city: e});
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            isFileSelected: "Fotoğraf Yüklenmeye Hazır"
        })
    };

    isValidDate(currentDate, selectedDate) {
        if (moment().subtract(1, "days") < currentDate)
            return true;

        return false;
    }

    render() {

        if (localStorage.getItem("cityId") === "null") {
            return (<div className="row outer">
                <div className={"col-md-6 offset-3 container"}><AlertMobile
                    type={"alert-warning"}
                    message={"Profilim->Bilgilerim kısmından şehir seçimi yapmalısın!"}
                /></div>
            </div>)
        }

        const {savedMessage} = this.state;
        const {errors} = this.state;
        const {photoName} = this.state;

        const deadLineDate = this.getInitDeadLine();

        return (
            <div className={"full-width container"}>
                <h4> Aktivite Oluştur</h4>
                <span>Bugünlerde ne planlıyorsun, birkaç saat içinde yakınlardaki bir parkta yürüyüş yapmak mı, yoksa haftasonu sinemaya gitmek mi..
                         Her ne planlıyorsan bizimle paylaş, birlikte yapalım!</span>

                {photoName && (
                    <img className={"meetingFormPhoto"} src={"/upload/" + photoName}/>
                )}
                <hr/>
                <form onSubmit={this.onSubmit}>

                    <div className={"text-align-left"}>
                    <label><i className="fas fa-map-marker"/> Şehir
                        Filtresi:</label>

                        <Select value={this.state.city} options={this.state.cities}
                                onChange={this.onSelectChange}/>
                    </div>
                    <br/>
                    <ActivityDetailInputMobil
                        error={errors.detail}
                        onChange={this.onChange}
                        detail={this.state.detail}
                    />
                    <br/>
                    <label className={"text-align-left"}><i
                        className="far fa-clock"/> Tarih-Zaman:</label>
                    <div className={"text-align-center"}>
                        <Datetime
                            dateFormat={"DD/MM/YYYY"}
                            timeFormat={"HH:mm"}
                            onChange={this.dateSelected}
                            isValidDate={this.isValidDate}
                            locale={"tr"}
                            open={true}
                            input={false}
                            value={deadLineDate}

                        />
                    </div>
                    {errors.deadLineString && (
                        <span>{errors.deadLineString}</span>
                    )}


                    <SinglePhotoSelectorMobile
                        isFileSelected={this.state.isFileSelected}
                        onChange={this.handleSelectedFile}
                        error={errors.file}
                    />

                    {savedMessage && (
                        <div className={"alert alert-success"}>
                            {savedMessage}
                            <a href="/"><strong>Aktiviten Yayında! burada görünüyor :)</strong> </a>
                        </div>
                    )}
                    <input
                        type="submit"
                        value="Kaydet ve Yayınla"
                        className="btn btn-primary btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    />
                </form>
                <br/>
            </div>

        );
    }
}


export default BaseActivityFormMobile;