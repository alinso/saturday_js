import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import MessageBoxMobile from "./MessageBoxActivityMobile";
import Globals from "../../util/Globals";

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


    sendMessage(messageDto) {

        const self = this;
        axios.post(Globals.serviceUrl + 'messageActivity/send/', messageDto, Security.authHeader())
            .then(function (response) {
                let messages = self.state.messages;
                let newMessage = response.data;
                messages.push(newMessage);
                self.setState({messages: messages});
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
                    messages={this.state.messages}
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
                        <input
                            type="submit"
                            value="Gönder"
                            className="btn btn-primary sendMessageButton"
                        />
                    </div>

                    <span className={"activityMessageMobileWarning"}>Onayladığın aktivitelere aktivite bitiminden 2 gün sonrasına kadar yazabilirsin</span>

                    <br/>
                    <br/>
                </form>
                <br/>
            </div>

        );
    }
}


export default MessageActivityPageMobile;