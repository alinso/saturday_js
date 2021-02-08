import React from "react";
import Security from "../../../security/Security";
import Datetime from "react-datetime";
import SinglePhotoSelector from "../../common/SinglePhotoSelector";
import Select from 'react-select'
import Alert from "../../common/Alert";
import EventDetailInput from "../../common/EventDetailInput";

const moment = require("moment");



require('moment/locale/tr');


class BaseEventForm extends React.Component {
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
            audiance:"everyone",
            cities: [],
            city: {},
            errors: {},
            hideInterests:true,
            InterestsTitle:"Kategorileri Göster",
            allInterests: [],
            selectedInterestIds: [],
            eventLimitExceeded:false
        };

        this.toggleInterest = this.toggleInterest.bind(this);

        this.loadInterests  =this.loadInterests.bind(this);
        this.onChange = this.onChange.bind(this);
        this.dateSelected = this.dateSelected.bind(this);
        this.onHourChange = this.onHourChange.bind(this);
        this.onMinuteChange = this.onMinuteChange.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.loadCities = this.loadCities.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.toggleInterestVisibility=this.toggleInterestVisibility.bind(this);

        this.setHours();
        this.setMinutes();
        const now = moment();
        this.state.deadLine = {
            date: now.format("DD/MM/YYYY"),
            hour: {label: "18", value: "18"},
            minute: {label: "00", value: "00"}
        };

    }


    toggleInterest(id) {
        let alreadyExists = this.state.selectedInterestIds.includes(id);
        let selectedInterestIds = this.state.selectedInterestIds;

        if (alreadyExists) {
            const index = this.state.selectedInterestIds.indexOf(id);
            if (index > -1) {
                selectedInterestIds.splice(index, 1);
            }
        } else {
            selectedInterestIds.push(id);
        }

        this.setState({selectedInterestIds: selectedInterestIds});
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

    toggleInterestVisibility(){
        let not = !this.state.hideInterests;
        this.setState({hideInterests:not});

        if(not)
            this.setState({interestsTitle:"Kategorileri Göster"});
        if(!not)
            this.setState({interestsTitle:"Kategorileri Gizle"});

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

        let self=this;
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

        if (this.state.eventLimitExceeded) {
            return (
                <div className={"full-width container"}><Alert
                    type={"alert-warning"}
                    message={this.state.eventLimitExceeded}
                /></div>
            )
        }


        return (
            <div className={"full-width container"}>
                <h4> Aktivite Oluştur</h4>
                <span>Bugünlerde ne planlıyorsun, her ne yapmak istiyorsan bizimle paylaş, birlikte yapalım!</span><br/>

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
                    <EventDetailInput
                        error={errors.detail}
                        onChange={this.onChange}
                        detail={this.state.detail}
                        hashtagListString={this.state.hashtagListString}
                    />
                    <hr/>
                    <button type={"button"} className={"btn btn-info"} onClick={this.toggleInterestVisibility}><i className="fas fa-plus-circle"/> {this.state.interestsTitle}</button>
                    <div hidden={this.state.hideInterests}>
                    {this.state.allInterests.length > 0 && this.state.allInterests.map(function (cat) {

                        let catClass = "category-button-passive";
                        if (self.state.selectedInterestIds.includes(cat.id))
                            catClass = "category-button-active";
                        return (
                            <div className={"half-left category-button " + catClass}
                                 onClick={() => self.toggleInterest(cat.id)}>
                                <span style={{fontSize:"13px"}}> {cat.name} ({cat.watcherCount})</span>
                            </div>
                        )
                    })}
                    <div className={"clear-both"}/>
                    </div><br/>
                    {errors.selectedInterestIds && (
                        <span className={"error-message"}>{errors.selectedCategoryIds}</span>
                    )}
                    <hr/>
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

                    <SinglePhotoSelector
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
                            <a href="/"><strong>{errors.userWarningMessage}</strong> </a>
                        </div>
                    )}
                    <hr/>
                    <div className="form-group">
                        Bu aktiviteyi kimler görebilir,<br/>
                        <label className="customRadioLabelMobile ">Yalnız listem&nbsp;</label>
                        <input type="radio"
                               name="audiance"
                               value="mylist"
                               onChange={this.onChange}
                               className="customRadio"
                               checked={this.state.audiance=="mylist"}
                        />&nbsp;&nbsp;
                        <label className="customRadioLabelMobile ">Herkes&nbsp;</label>
                        <input type="radio"
                               name="audiance"
                               onChange={this.onChange}
                               value="everyone"
                               checked={this.state.audiance=="everyone"}
                               className="customRadio"
                        />
                        <br/>
                        <div  className="form-error" >
                            {errors.gender}
                        </div>

                    </div>
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


export default BaseEventForm;