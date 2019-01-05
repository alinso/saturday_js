import React from "react";
import classnames from "classnames";
import Security from "../../security/Security";
import Alert from "../common/Alert";

const axios = require('axios');


class CreateMeeting extends React.Component {
    constructor() {
        super();
        Security.protect();

        this.state = {
            detail: "",
            savedMessage: false,
            isSubmitDisabled:false,
            selectedFile:null,
            isFileSelected:false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
    }

    createMeeting(newMeeting) {
        console.log(newMeeting);
        let self = this;
        axios.post('http://localhost:8080/meeting/create', newMeeting,Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Kaydedildi, iyi eğlenceler :)"});
            })
            .catch(function (error) {
                console.log(error.response.data);
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled:false});
            });
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

    onSubmit(e) {
        e.preventDefault();

        this.setState({isSubmitDisabled:true});

        const data = new FormData();

        if(this.state.selectedFile!=null)
        data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        data.append("detail",this.state.detail);

        this.createMeeting(data);
    }


    render() {

        const {savedMessage} = this.state;
        const {errors} = this.state;
        return (
            <div className="row">
                <div className={"col-md-6 offset-3"}>
                    <h4>Dışarı Çık!</h4>

                    {savedMessage && (
                        <div className="alert alert-success">
                            {savedMessage}
                            <a href="/"><strong> Mesajın burada görünüyor</strong> </a>
                        </div>
                    )}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <textarea
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.detail
                                })}
                                placeholder="Nereye gideceksin.. Ne zaman gideceksin.. gibi detaylar"
                                name="detail"
                                value={this.state.detail}
                                onChange={this.onChange}
                            />
                            {errors.detail && (
                                <div className="invalid-feedback">
                                    {errors.detail}
                                </div>
                            )}
                        </div>

                        <label className="btn btn-default">
                            <div className="uploadBrowseButton">Fotoğraf Seç</div>
                            <input type="file" hidden onChange={this.handleSelectedFile}/>
                            {
                                this.state.isFileSelected && (
                                    <span><strong>{this.state.isFileSelected}</strong></span>
                                )
                            }
                        </label><br/>
                        {errors.file && (
                            <span>
                                {errors.file}
                            </span>
                        )}

                        <input
                            type="submit"
                            value="Yayınla"
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


export default CreateMeeting;