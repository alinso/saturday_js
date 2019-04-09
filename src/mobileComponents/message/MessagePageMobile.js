import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import MessageBoxMobile from "./DisplayMessagesMobile";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class MessagePageMobile extends React.Component {
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
        this.deleteConvo = this.deleteConvo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fillPage();
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    deleteConvo() {
        if (window.confirm("Bu konuşmayı silmek istediğinden emin misin?")) {
            axios.get(Globals.serviceUrl + 'message/deleteConversation/' + this.props.match.params.id, Security.authHeader())
                .then(function (response) {
                    window.location="/conversations";
                });
        }
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
                self.setState({message: ""});

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
            <div className={"full-width container"}>
                <ProfilePicMobile
                    userId={this.props.match.params.id}
                    profilePicName={this.state.readerProfile.profilePicName}
                    cssClass={"profilePicSmallMobile"} />
                &nbsp;
                <UserFullNameMobile
                    user={this.state.readerProfile}
                />
                <br/>   <br/>
                    <MessageBoxMobile
                        messages={this.state.messages}
                    />
                <div>
                    <button onClick={()=>this.deleteConvo()} className={"btn btn-danger float-left"}>Konuşmayı Sil</button>
                    <a className={"complainOnMessagePage"} href={"/complain/" + this.state.readerProfile.id}><button className={"btn btn-success"}> Şikayet
                        Et</button></a>
                </div>
                <div className={"clear-both"}/>
                <br/>


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
                    <br/>
                    <span className={"messageWarning"}> Rahatsız edici, ısrarcı, uygulama amacı dışında yazanları bize bildir(aramızda kalacak). Burada iyi ve az insan olsun istiyoruz.<br/>
                                Ve unutma hayır, "HAYIR!" demektir!</span>
                </form>
                <br/>
            </div>

        );
    }
}


export default MessagePageMobile;