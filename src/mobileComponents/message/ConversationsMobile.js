import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import MessageBox from "./DisplayMessagesMobile";

const axios = require('axios');


class ConversationsMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            conversations: [],
            errors: {}
        };

        this.fillPage();
    }

    fillPage() {

        let self = this;

        axios.get('http://localhost:8080/message/conversations', Security.authHeader())
            .then(function (response) {
                self.setState({conversations: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });

        axios.get('http://localhost:8080/notification/readMessages', Security.authHeader());

    }


    render() {

        return (
            <div className={"full-width container"}>
                <h5 className={"profileTitle"}><i className="fas fa-comments"/>Tüm Konuşmalar</h5>
                <hr/>
                {
                    this.state.conversations.map(function (conversation) {
                        return (
                            <div className={" full-width conversationContainer"}>
                                <div className={"full-width"}>
                                    <div className={"float-left text-align-left"}>
                                        <ProfilePicMobile
                                            cssClass={"profilePicSmall"}
                                            userId={conversation.profileDto.id}
                                            profilePicName={conversation.profileDto.profilePicName}
                                        />
                                    </div>
                                    <div className={"text-align-left"}>
                                        <br/>
                                        &nbsp;
                                        <UserFullNameMobile
                                            userId={conversation.profileDto.id}
                                            name={conversation.profileDto.name}
                                            surname={conversation.profileDto.surname}
                                        />
                                        <a href={"/message/" + conversation.profileDto.id}
                                           className={"float-left conversationText"}>
                                            <div className={""}>
                                                <span dangerouslySetInnerHTML={{__html: conversation.lastMessage}}/>
                                            </div>
                                        </a>
                                    </div>
                                    <div className={"clear-both"}/>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        );
    }
}


export default ConversationsMobile;