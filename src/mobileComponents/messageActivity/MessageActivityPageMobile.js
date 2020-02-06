import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import MessageBoxMobile from "./MessageBoxActivityMobile";
import Globals from "../../util/Globals";
import JsUtil from "../../util/JSUtil";

const axios = require('axios');


class MessageActivityPageMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();


        this.state = {
            messages: [],
            message: "",
            activityId: this.props.match.params.id,
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendLocation = this.sendLocation.bind(this);
        this.sendLink = this.sendLink.bind(this);
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const message = {
            message: this.state.message,
            activityId: this.state.activityId
        };
        this.sendMessage(message);
    }

    sendLocation() {

        let confirm = window.confirm("Bu gruba konum göndermek istediğinden emin misin?(Şu an tarayıcıda çalışıyor, yakında uygulamada da açılacak)");

        if (!confirm)
            return false;

        let self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let DMS = JsUtil.convertDMS(position.coords.latitude, position.coords.longitude);
                let locationMapsLink = '<a href="https://www.google.com/maps/place/' + DMS + '" target="_blank">KONUMUM</a>';

                const message = {
                    message: locationMapsLink,
                    activityId: self.state.activityId
                };

                self.sendMessage(message);
            });
        }
    }

    sendLink(e) {
        e.preventDefault();

        if (this.state.message == "") {
            alert("Linki mesaj kutusuna yapıştır ve bu butona tıkla");
            return false;
        }

        const message = {
            message: "<a href='" + this.state.message + "'  target='_blank'>" + this.state.message + "</a>",
            activityId: this.state.activityId
        };
        this.sendMessage(message);
    }


    sendMessage(messageDto) {

        const self = this;
        axios.post(Globals.serviceUrl + 'messageActivity/send/', messageDto, Security.authHeader())
            .then(function (response) {
                //  let messages = self.state.messages;
                //   let newMessage = response.data;
                // messages.push(newMessage);
                // self.setState({messages: messages});
                self.setState({message: ""});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }


    render() {

        return (
            <div className={"full-width container"}>
                <h4><a href={"/activityDetail/" + this.props.match.params.id}>{"Aktivite " + this.state.activityId}</a>
                </h4>

                <MessageBoxMobile
                    activityId={this.props.match.params.id}
                />


                <form onSubmit={this.onSubmit}>

                    <div>
                            <textarea
                                className={classnames("form-control form-control-lg messageTextAreaMobile")}
                                placeholder="Mesaj yaz"
                                name="message"
                                value={this.state.message}
                                onChange={this.onChange}
                            />


                        <input
                            type="submit"
                            value="Gönder"
                            className="btn btn-primary sendMessageButton"
                        />
                    </div>
                    {this.state.errors.message && (
                        <div>
                            {this.state.errors.message}
                        </div>
                    )}

                    {this.state.errors.userWarningMessage && (
                        <div>
                            {this.state.errors.userWarningMessage}
                        </div>
                    )}
                    <span className={"activityMessageMobileWarning"}>Onayladığın aktivitelere aktivite bitiminden 2 gün sonrasına kadar yazabilirsin</span>
                    <br/>

                    <button className={"btn btn-danger"} onClick={this.sendLocation}>Konum</button>
                    &nbsp;
                    <button className={"btn btn-success"} onClick={this.sendLink}>Link</button>
                    &nbsp;
                    <a href={"/activityAlbum/"+this.props.match.params.id}><button type={"button"} className={"btn btn-primary"}>Fotoğraf </button></a>

                    <br/>
                    <br/>
                    <br/>
                </form>
                <br/>
            </div>
        );
    }
}

export default MessageActivityPageMobile;