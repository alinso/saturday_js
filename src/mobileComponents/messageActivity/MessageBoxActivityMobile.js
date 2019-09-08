import React from "react";
import Globals from "../../util/Globals";
import Security from "../../security/Security";

const axios = require('axios');


class MessageBoxActivityMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          messages:[],
        };
        this.fillPage  =this.fillPage.bind(this);
        this.scrollToBottom=this.scrollToBottom.bind(this);
        this.fillPage();

        const self=this;
        setInterval(function () {
            self.fillPage();
        },4000);

        setTimeout(function () {
            self.scrollToBottom();
        },1200)
    }


    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }




    // scrollToBottom() {
    //     const scrollHeight = this.messageList.scrollHeight;
    //     const height = this.messageList.clientHeight;
    //     const maxScrollTop = scrollHeight - height;
    //     this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    // }


    fillPage() {

        let self = this;
        let oldLength = this.state.messages.length;
        axios.get(Globals.serviceUrl + 'messageActivity/getMessages/' + this.props.activityId, Security.authHeader())
            .then(function (response) {
                self.setState({messages: response.data});
                if(response.data.length>oldLength)
                    self.scrollToBottom();
            })
    }

    render() {

        return (
            <div className="messageBoxMobile" ref={(div) => {
                this.messageList = div;
            }}>
                {this.state.messages.map(function (message) {
                        let msgClass = "breakLine incomingMessage";
                        if (message.writer.id.toString() === localStorage.getItem("userId")) {
                            msgClass = "breakLine outgoingMessage";
                        }

                        return (<div className={msgClass + "Container"}>
                                <div className={msgClass}>
                                    <strong>
                                        {message.writer.premiumType==="GOLD" &&(

                                            <span className={'goldCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                                        )}
                                        {message.writer.premiumType==="SILVER" &&(

                                            <span className={'silverCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                                        )}
                                        <a href={"/profile/"+message.writer.id}> {message.writer.name+" "+message.writer.surname}</a></strong><br/>
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


export default MessageBoxActivityMobile;






