import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import MessageBox from "./DisplayMessages";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class MessagePage extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        UserUtil.redirectIsBlocked(this.props.match.params.id);


        this.state = {
            messages: [],
            message: "",
            readerProfile: {},
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fillPage();
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();

        const message = {
            message: this.state.message,
            reader: this.state.readerProfile
        };
        this.sendMessage(message);
    }


    sendMessage(messageDto) {

        const self = this;
        axios.post(Globals.serviceUrl+'message/send/', messageDto, Security.authHeader())
            .then(function (response) {
                let messages = self.state.messages;
                let newMessage = response.data;
                messages.push(newMessage);
                self.setState({messages: messages});
                self.setState({message:""});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    fillPage() {

        let self = this;

        //get the reader user
        axios.get(Globals.serviceUrl+'user/profile/' + this.props.match.params.id)
            .then(function (response) {
                self.setState({readerProfile: response.data});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });


        //get messages
        axios.get(Globals.serviceUrl+'message/getMessagesForReader/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({messages: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });

    }


    render() {

        return (
            <div className="row outer">
                <div className={"col-md-6 offset-3 container"}>
                    <ProfilePic
                        userId={this.props.match.params.id}
                        profilePicName={this.state.readerProfile.profilePicName}
                    />
                    <UserFullName
                        user={this.state.readerProfile}
                    />
                    <div className={"col-md-10 m-auto"}>
                    <MessageBox
                        messages={this.state.messages}
                    />
                        <a className={"complainOnMessagePage"} href={"/complain/"+this.state.readerProfile.id}>Şikayet Et</a>
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <textarea
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": this.state.errors.message
                                })}
                                placeholder="Mesaj yazın"
                                name="message"
                                value={this.state.message}
                                onChange={this.onChange}
                            />
                            {this.state.errors.message && (
                                <div className="invalid-feedback">
                                    {this.state.errors.message}
                                </div>
                            )}
                        </div>

                        <input
                            type="submit"
                            value="Gönder"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </form>
                    <br/>
                </div>
            </div>

        );
    }
}


export default MessagePage;