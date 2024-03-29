import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import MessageBox from "./MessageBox";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class MessagePage extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        UserUtil.redirectIsBlocked(this.props.match.params.id);


        this.state = {
            message: "",
            readerProfile: {},
            errors: {}
        };
        this.deleteConvo = this.deleteConvo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.canItext = this.canItext.bind(this);
        this.fillPage = this.fillPage.bind(this);
        this.canItext();

        this.fillPage();


    }


    canItext() {
        const self = this;
        axios.get(Globals.serviceUrl + 'message/haveTheseUsersMeet/' + this.props.match.params.id + '/' + localStorage.getItem("userId"), Security.authHeader())
            .then(function (response) {
                self.setState({"canItext": response.data});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    deleteConvo() {
        if (window.confirm("Bu konuşmayı silmek istediğinden emin misin?")) {
            axios.get(Globals.serviceUrl + 'message/deleteConversation/' + this.props.match.params.id, Security.authHeader())
                .then(function (response) {
                    window.location = "/conversations";
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
        axios.post(Globals.serviceUrl + 'message/send/', messageDto, Security.authHeader())
            .then(function (response) {
                // let messages = self.state.messages;
                // let newMessage = response.data;
                // messages.push(newMessage);
                // self.setState({messages: messages});
                self.setState({message: ""});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    fillPage() {

        let self = this;

        //get the reader user
        axios.get(Globals.serviceUrl + 'user/profile/' + this.props.match.params.id)
            .then(function (response) {
                self.setState({readerProfile: response.data});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });
    }


    render() {

        return (
            <div className={"full-width container"}>
                <ProfilePic
                    userId={this.props.match.params.id}
                    profilePicName={this.state.readerProfile.profilePicName}
                    cssClass={"profilePicSmallMobile"}/>
                &nbsp;
                <UserFullName
                    user={this.state.readerProfile}
                />
                <br/> <br/>
                <MessageBox
                    activityId={this.props.match.params.id}
                />

                <div>
                    <button onClick={() => this.deleteConvo()} className={"btn btn-danger float-left"}>Konuşmayı Sil
                    </button>
                    <a className={"complainOnMessagePage"} href={"/complain/" + this.state.readerProfile.id}>
                        <button className={"btn btn-success"}> Şikayet Et</button>
                    </a>
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

                    {this.state.canItext && (
                        <input
                            type="submit"
                            value="Gönder"
                            className="btn btn-primary btn-block mt-4"
                        />
                    )}

                    {!this.state.canItext && (
                        <div>
                            <span>Bu kişi ile yakın zamanda onaylanmış bir aktiviten yok, yalnız yakın zamanda ortak aktiviten olan kişilere mesaj atabilirsin. <br/>
                            Sosyalleşmek için bir aktivite oluşturabilir veya birine katılabilirsin :)</span>
                        </div>
                    )}
                    <br/>
                    <span className={"messageWarning"}> Rahatsız edici kişilere profilinden olumsuz oy ver, bunu kimse göremez ve istediğin zaman değiştirebilirsin.
                        Burada Hoşgörü ve saygı önemli </span>
                </form>
                <br/>
            </div>

        );
    }
}


export default MessagePage;