import React from "react";
import Security from "../../../security/Security";
import ActivityDetailInputMobil from "../../common/ActivityDetailInputMobil";
import Datetime from "react-datetime";
import SinglePhotoSelectorMobile from "../../common/SinglePhotoSelectorMobile";
import Select from 'react-select'
import CityUtil from "../../../util/CityUtil";
import AlertMobile from "../../common/AlertMobile";
import Alert from "../../../pcComponents/common/Alert";

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
            deadLine: {},
            savedMessage: false,
            selectedFile: null,
            hashtagListString:"",
            isFileSelected: false,
            isSubmitDisabled: false,
            cities: [],
            city: {},
            errors: {},
            activityLimitExceeded:false
        };

        this.onChange = this.onChange.bind(this);
        this.dateSelected = this.dateSelected.bind(this);
        this.onHourChange = this.onHourChange.bind(this);
        this.onMinuteChange = this.onMinuteChange.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.loadCities = this.loadCities.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);


        this.setHours();
        this.setMinutes();
        const now = moment();
        this.state.deadLine = {
            date: now.format("DD/MM/YYYY"),
            hour: {label: "18", value: "18"},
            minute: {label: "00", value: "00"}
        };

    }

    setHours() {
        let arr = [];
        let hour;
        for (let i = 23; i >= 0; i--) {

            if (i < 10) {
                hour = {value: "0" + i.toString(), label: "0" + i.toString()}
            } else {
                hour = {value: i.toString(), label: i.toString()};
            }
            arr.push(hour);
        }
        this.state.hours = arr;
    }

    setMinutes() {
        let arr = [];
        let minute;
        for (let i = 0; i < 4; i++) {
            if (i == 0)
                minute = {label: "00", value: "00"};
            else
                minute = {label: (i * 15).toString(), value: (i * 15).toString()};


            arr.push(minute);
        }

        this.state.minutes = arr;
    }


    dateSelected(e) {
        let selectedDate = e.format("DD/MM/YYYY");
        let deadLineNew = Object.assign({}, this.state.deadLine);
        deadLineNew.date = selectedDate;
        this.setState({deadLine: deadLineNew});
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectChange(e) {
        console.log(e);
        this.setState({city: e});
    }

    onHourChange(e) {
        let deadLineNew = Object.assign({}, this.state.deadLine);
        deadLineNew.hour = e;
        this.setState({deadLine: deadLineNew});
    }

    onMinuteChange(e) {
        let deadLineNew = Object.assign({}, this.state.deadLine);
        deadLineNew.minute = e;
        this.setState({deadLine: deadLineNew});
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

        const {savedMessage} = this.state;
        const {errors} = this.state;
        const {photoName} = this.state;
        const {hours} = this.state;
        const {minutes} = this.state;

        if (localStorage.getItem("cityId") === "null") {
            return (<div className="full-width container">
                <a href="/updateInfo"> <div className={"alert alert-danger"}>
                    Akışı görebilmek için buraya tıklayıp ŞEHİR  ve TELEFON bilgisi girmelisin</div></a>
            </div>)
        }

        if (this.state.activityLimitExceeded) {
            return (
                <div className={"full-width container"}><Alert
                    type={"alert-warning"}
                    message={"Haftada e fazla 2 aktivite oluşturabilirsin"}
                /></div>
            )
        }


        return (
            <div className={"full-width container"}>
                <h4> Aktivite Oluştur</h4>
                <span>Bugünlerde ne planlıyorsun, her ne yapmak istiyorsan bizimle paylaş, birlikte yapalım!</span>

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
                        hashtagListString={this.state.hashtagListString}
                    />
                    <br/>
                    <label className={"text-align-left"}><i
                        className="far fa-clock"/> Tarih-Zaman:</label>
                    <div className={"text-align-center"}>
                        <Datetime
                            dateFormat={"DD/MM/YYYY"}
                            timeFormat={false}
                            onChange={this.dateSelected}
                            isValidDate={this.isValidDate}
                            locale={"tr"}
                            open={true}
                            input={false}
                            value={this.state.deadLine.date}

                        />
                        <div className={"timeSelectContainerMobile m-auto"}>
                            <div className={"float-left"}>
                                <div className={"timeSelectLabelMobile"}><strong>Saat :&nbsp;</strong></div>
                            </div>
                            <div className={"float-left timeSelectMobile"}>
                                <Select isSearchable={false} ref={node => this.secondSelect = node} options={hours} value={this.state.deadLine.hour} onChange={this.onHourChange}/>
                            </div>
                            <span className={"float-left"}>&nbsp; : &nbsp;</span>

                            <div className={"float-left timeSelectMobile"}>
                                <Select isSearchable={false} options={minutes} value={this.state.deadLine.minute}
                                        onChange={this.onMinuteChange}/>
                            </div>
                            <div className={"clear-both"}/>
                        </div>
                    </div>
                    {errors.deadLineString && (
                        <span>{errors.deadLineString}</span>
                    )}
                    <hr/>

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
                    {errors.userWarningMessage && (
                        <div className={"alert alert-danger"}>
                            {savedMessage}
                            <a href="/"><strong>Tarihi geçmiş aktivitede değişiklik yapamazsın</strong> </a>
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
                <br/>
                <br/>
            </div>

        );
    }
}


export default BaseActivityFormMobile;