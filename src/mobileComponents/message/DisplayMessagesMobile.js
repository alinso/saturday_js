import React from "react";
import Globals from "../../util/Globals";
import Security from "../../security/Security";

const axios = require('axios');


class MessageBoxMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            messages:[]
        };

        this.fillPage=this.fillPage.bind(this);
        this.fillPage();
        const self = this;
        setInterval(function () {
            self.fillPage();
        }, 4000);


        setTimeout(function () {
            self.scrollToBottom();
        }, 1600)
    }


    fillPage() {
        //get messages
        let self=this;
        let oldLength = this.state.messages.length;

        axios.get(Globals.serviceUrl + 'message/getMessagesForReader/' + this.props.activityId, Security.authHeader())
            .then(function (response) {
                self.setState({messages: response.data});
                if(response.data.length>oldLength)
                    self.scrollToBottom();
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }


    render() {

        return (
            <div className="messageBoxMobile" ref={(div) => {
                this.messageList = div;
            }}>
                {this.state.messages.map(function (message) {
                        let msgClass = "breakLine outgoingMessage";
                        console.log(message.reader.id);
                        if (message.reader.id.toString() === localStorage.getItem("userId")) {
                            msgClass = "breakLine incomingMessage";
                        }

                        return (<div className={msgClass + "Container"}>
                                <div className={msgClass}>
                                    {message.message}
                                    <span className={"messageDate"}>
                                    {message.createdAt}
                                </span>
                                </div>
                            </div>
                        )
                    }
                )
                }
            </div>
        )
    }
}


export default MessageBoxMobile;






