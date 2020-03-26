import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";
import GhostMessageBoxMobile from "./GhostMessageBoxMobile";
import SinglePhotoSelectorMobile from "../common/SinglePhotoSelectorMobile";

const axios = require('axios');


class GhostMessagePageMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        UserUtil.redirectIsBlocked(this.props.match.params.id);


        this.state = {
            message: "",
            picUrl: null,
            isFileSelected: false,
            selectedFile: null,
            notify: false,
            loaded: 0,
            errors: {}
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.onSend = this.onSend.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleNotification = this.toggleNotification.bind(this);

        this.isReceivingNotification();

    }

    isReceivingNotification() {
        let self = this;
        axios.get(Globals.serviceUrl + "ghostMessage/isReceivingNotification", Security.authHeader())
            .then(function (res) {
                self.setState({notify: res.data});
            });
    }


    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            isFileSelected: "Fotoğraf Yüklenmeye Hazır"
        })

    };

    handleUpload = () => {
        const data = new FormData();
        this.setState({isFileSelected: false});
        if (this.state.selectedFile == null) {
            this.setState({"errors": {file: "Fotoğraf dosyası seçmelisin"}});
            return;
        }
        data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        const self = this;
        axios
            .post(Globals.serviceUrl + "ghostMessage/uploadPhoto", data, Security.authHeader(), {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            }).then(function () {
            self.setState({errors: {}});
        })
            .catch(function (error) {
                self.setState({isFileSelected: false});
                self.setState({"errors": error.response.data});
            });
    };

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSend() {

        if (this.state.isFileSelected !== false) {
            this.handleUpload();
            return;
        }

        let urlMessage = this.urlify(this.state.message);
        const messagex = {message: urlMessage};
        this.sendMessage(messagex);
    }

    toggleNotification() {
        let self = this;
        let notifyOld = this.state.notify;
        axios.get(Globals.serviceUrl + "ghostMessage/toggleNotification", Security.authHeader())
            .then(function () {
                self.setState({notify: !notifyOld});
            });

    }

    urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '">[-LİNK-]</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }

    sendMessage(messagex) {

        if (messagex === "")
            return;

        const self = this;
        axios.post(Globals.serviceUrl + 'ghostMessage/save/', messagex, Security.authHeader())
            .then(function (response) {
                self.setState({message: ""});
                self.setState({errors: {}});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }


    render() {


        let notifyButtonText = "Bildirim Al";
        let bell="fa-bell";
        if (this.state.notify) {
            notifyButtonText = "Sessize Al";
            bell="fa-bell-slash";
        }

        return (
            <div className={"full-width"} style={{paddingBottom:"70px"}}>
                <GhostMessageBoxMobile
                    activityId={this.props.match.params.id}
                />
                <div className={"clear-both"}/>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                            <textarea
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": this.state.errors.message
                                })}
                                placeholder="Herkese açık bir not bırak"
                                name="message"
                                value={this.state.message}
                                onChange={this.onChange}
                            />
                        {this.state.errors.message && (
                            <div className="invalid-feedback">
                                {this.state.errors.message}
                            </div>
                        )}
                        <div className={"float-left"}>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.toggleNotification}
                            ><strong><i className={"far "+bell}/>{notifyButtonText}</strong></button>
                        </div>
                        <div className={"float-right"}>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.onSend}
                            ><strong><i className="far fa-paper-plane"/>Gönder</strong></button>
                        </div>
                        <div className={"half-left"}>
                            <SinglePhotoSelectorMobile
                                onChange={this.handleSelectedFile}
                                isFileSelected={this.state.isFileSelected}
                                error={this.state.errors.file}
                            />
                        </div>
                    </div>
                </form>
                <br/>
                <br/>
                <br/>
            </div>

        );
    }
}


export default GhostMessagePageMobile;