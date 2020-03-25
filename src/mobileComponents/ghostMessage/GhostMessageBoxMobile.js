import React from "react";
import Globals from "../../util/Globals";
import Security from "../../security/Security";

const axios = require('axios');


class GhostMessageBoxMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            messages:[]
        };

        this.fillPage=this.fillPage.bind(this);
        this.fillPage(0);
        const self = this;
        setInterval(function () {
            self.fillPage(1);
        }, 4000);

    }


    fillPage(x) {


        //get messages
        let self=this;

        axios.get(Globals.serviceUrl + 'ghostMessage/all/', Security.authHeader())
            .then(function (response) {
                self.setState({messages: response.data});
                if(x===0)
                    self.scrollToBottom();
            })

    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }


    render() {

        return (
            <div className="ghostMessageBoxMobile" ref={(div) => {
                this.messageList = div;
            }}>

                {this.state.messages.map(function (message) {
                        let msgClass = "breakLine ghostMessage";

                        return (<div className={msgClass + "Container"}>
                                <div className={msgClass}>
                                    <div dangerouslySetInnerHTML={{__html:message}}></div>
                                </div>
                                <hr/>
                            </div>

                        )
                    }
                )
                }
            </div>
        )
    }
}


export default GhostMessageBoxMobile;






