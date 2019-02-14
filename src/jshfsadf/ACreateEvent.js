import React from "react";
import Security from "../security/Security";
import SinglePhotoSelector from "../pcComponents/common/SinglePhotoSelector";
import classnames from "classnames";
import Globals from "../util/Globals";

const axios = require('axios');


class AEventCreate extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            detail:"",
            title:"",
            dtString:""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);

    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            isFileSelected: "Fotoğraf Yüklenmeye Hazır"
        })
    };

    createEvent(newEvent) {
        let self = this;
        console.log(newEvent);
        axios.post(Globals.serviceUrl+'sdklsdf/saveEvent', newEvent, Security.authHeader())
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


    onSubmit(e) {
        e.preventDefault();

        this.setState({isSubmitDisabled: true});

        const data = new FormData();
        if (this.state.selectedFile != null)
            data.append('file', this.state.selectedFile, this.state.selectedFile.name);

        data.append("detail", this.state.detail);
        data.append("title", this.state.title);
        data.append("dtString",this.state.dtString);
        this.createEvent(data);
    }



    render() {

        const {photoName} = this.state;
       // const {errors} = this.state;


        return (
            <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                    <div className={"col-md-8 m-auto"}>
                        <h4> Etkinlik Oluştur</h4>
                        <span>Çalış nedim de kurtulak şu mebitechten</span>


                        {photoName && (
                            <img className={"meetingFormPhoto"} src={"/upload/" + photoName}/>
                        )}
                        <hr/>
                        <form onSubmit={this.onSubmit}>


                            <div className={"col-md-9"}>
                                <div className="form-group  text-align-left">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg")}
                                        placeholder="tarih (gg/aa/yyyy ss:dd)"
                                        name="dtString"
                                        value={this.state.dtString}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className={"col-md-9"}>
                                <div className="form-group  text-align-left">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg")}
                                        placeholder="Başlık"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className={"col-md-9"}>
                            <textarea
                                className={classnames("form-control form-control-lg breakLine")}
                                placeholder="içerik"
                                name="detail"
                                value={this.state.detail}
                                onChange={this.onChange}
                            />
                            </div>
                            <hr/>
                            <SinglePhotoSelector
                                isFileSelected={this.state.isFileSelected}
                                onChange={this.handleSelectedFile}
                                error={""}
                            />
                            <input
                                type="submit"
                                value="kaydet"
                                className="btn btn-primary btn-block mt-4"
                                disabled={this.state.isSubmitDisabled}
                            />
                        </form>
                        <br/>
                    </div>
                </div>
            </div>

        );
    }
}


export default AEventCreate;