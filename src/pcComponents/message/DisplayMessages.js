import React from "react";

const axios = require('axios');


class MessageBox extends React.Component {
    constructor(props) {
        super(props);
    }


    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {

        return (
            <div className="messageBox" ref={(div) => {
                this.messageList = div;
            }}>
                {this.props.messages.map(function (message) {
                        let msgClass = "outgoingMessage";
                        console.log(message.reader.id);
                        if (message.reader.id.toString() === localStorage.getItem("userId")) {
                            msgClass = "incomingMessage";
                        }

                        return (<div className={msgClass+"Container"}>
                                <div className={msgClass}>
                                <span dangerouslySetInnerHTML={{__html: message.message}}/>

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


export default MessageBox;






