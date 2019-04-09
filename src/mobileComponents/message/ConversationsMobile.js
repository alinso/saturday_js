import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import MessageBox from "./DisplayMessagesMobile";
import Globals from "../../util/Globals";

const axios = require('axios');


class ConversationsMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            conversations: [],
            errors: {},
            pageNum: 0,
            noMoreRecords: false
        };

        let self = this;
        this.fillPage();
        this.loadMore  =this.loadMore.bind(this);
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                self.loadMore();
            }
        };
    }


    loadMore() {
        const self = this;
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        axios.get(Globals.serviceUrl + 'message/conversations' + "/" + newPageNum, Security.authHeader())
            .then(function (response) {

                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }

                let newConversations = self.state.conversations;
                newConversations = newConversations.concat(response.data);
                self.setState({conversations: newConversations});
            });
    }

    fillPage() {

        let self = this;

        axios.get(Globals.serviceUrl + 'message/conversations/0', Security.authHeader())
            .then(function (response) {
                self.setState({conversations: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });

        axios.get(Globals.serviceUrl + 'notification/readMessages', Security.authHeader());

    }


    render() {

        return (
            <div className={"full-width container"}>
                <h5 className={"profileTitleMobile"}><i className="fas fa-comments"/>Tüm Konuşmalar</h5>
                <hr/>
                {
                    this.state.conversations.map(function (conversation) {
                        return (
                            <div className={" full-width conversationContainer"}>
                                <div className={"full-width"}>
                                    <div className={"float-left text-align-left"}>
                                        <ProfilePicMobile
                                            cssClass={"profilePicSmallMobile"}
                                            userId={conversation.profileDto.id}
                                            profilePicName={conversation.profileDto.profilePicName}
                                        />
                                    </div>
                                    <div className={"text-align-left"}>
                                        <br/>
                                        &nbsp;
                                        <UserFullNameMobile
                                            user={conversation.profileDto}
                                        />
                                        <a href={"/message/" + conversation.profileDto.id}
                                           className={"float-left conversationTextMobile"}>
                                            <div className={""}>
                                                {conversation.lastMessage.substring(0, 100) + "..."}
                                            </div>
                                        </a>
                                    </div>
                                    <div className={"clear-both"}/>
                                </div>
                            </div>

                        )
                    })
                }
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>
                <br/><br/><br/>

            </div>
        );
    }
}


export default ConversationsMobile;