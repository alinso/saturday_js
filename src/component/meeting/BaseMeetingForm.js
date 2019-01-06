import React from "react";
import Security from "../../security/Security";
import MeetingDetailInput from "../common/MeetingDetailInput";
import Datetime from "react-datetime";
import SinglePhotoSelector from "../common/SinglePhotoSelector";

require('moment/locale/tr');


class BaseMeetingForm extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            id:null,
            detail:"",
            photoName:null,
            deadLineString:"",
            savedMessage: false,
            selectedFile:null,
            isFileSelected:false,
            isSubmitDisabled:false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.dateSelected=this.dateSelected.bind(this);
        this.handleSelectedFile=this.handleSelectedFile.bind(this);

    }


    dateSelected(e){
        let selectedDate = e.format("DD/MM/YYYY HH:mm");
        this.setState({deadLineString:selectedDate});
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            isFileSelected:"Fotoğraf Yüklenmeye Hazır"
        })
    };


    render() {

        const {savedMessage} = this.state;
        const {errors} = this.state;
        const {photoName} = this.state;

        const  deadLineDate  =this.getInitDeadLine();

        return (
            <div className="row">
                <div className={"col-md-6 offset-3"}>
                    <h4>Dışarı Çık!</h4>

                    {savedMessage && (
                        <div className={"alert alert-success"}>
                            {savedMessage}
                            <a href="/"><strong> Mesajın burada görünüyor</strong> </a>
                        </div>
                    )}

                    {photoName && (
                        <img className={"albumPhoto"} src={"/upload/"+photoName}/>
                    )}

                    <form onSubmit={this.onSubmit}>

                        <MeetingDetailInput
                            error={errors.detail}
                            onChange={this.onChange}
                            detail={this.state.detail}
                        />
                        {deadLineDate &&
                        <Datetime
                            dateFormat={"DD/MM/YYYY"}
                            timeFormat={"HH:mm"}
                            onChange={this.dateSelected}
                            locale={"tr"}
                            value={deadLineDate}

                        />
                        }
                        {errors.deadLineString && (
                            <span>{errors.deadLineString}</span>
                        )}


                        <SinglePhotoSelector
                            isFileSelected={this.state.isFileSelected}
                            onChange={this.handleSelectedFile}
                            error={errors.file}
                        />

                        <input
                            type="submit"
                            value="Kaydet ve Yayınla"
                            className="btn btn-primary btn-block mt-4"
                            disabled={this.state.isSubmitDisabled}
                        />
                    </form>
                    <br/>
                </div>
            </div>

        );
    }
}


export default BaseMeetingForm;