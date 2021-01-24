import React from "react";
import Globals from "../../util/Globals";
import Security from "../../security/Security";

const axios = require('axios');


class MessageBoxWall extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            messages:[],
            userId:localStorage.getItem("userId")
        };

        this.fillPage=this.fillPage.bind(this);
        this.delete=this.delete.bind(this);

        this.fillPage(0);
        const self = this;
        setInterval(function () {
            self.fillPage(1);
        }, 4000);

    }
    delete(id){
        if(window.confirm("Bu mesajı silmek istediğinden emin misin?")){
            axios.get(Globals.serviceUrl + 'ghostMessage/delete/'+ id, Security.authHeader())
                .then(function (response) {
                    alert("Silindi!")
                });
        }
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

        let self=this;
        return (
            <div className="ghostMessageBoxMobile" ref={(div) => {
                this.messageList = div;
            }}>

                {this.state.messages.map(function (message) {
                        let msgClass = "breakLine ghostMessage";
                        let deleteIt=false;
                        let msgWidth="98%";

                        if(message.delete==1){
                            deleteIt=true;
                            msgWidth="84%";

                        }
                        return (<div className={msgClass + "Container"}>
                                <div className={msgClass} style={{width:msgWidth}}>
                                    <div dangerouslySetInnerHTML={{__html:message.message}}></div>
                                </div>
                                {deleteIt && (
                                    <h2 style={{float:"right", marginRight:"10px",color:"#f37070"}} onClick={()=>self.delete(message.id)}><i className="far fa-trash-alt"/></h2>
                                )}
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


export default MessageBoxWall;






