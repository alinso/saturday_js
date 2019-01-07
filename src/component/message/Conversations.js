import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import MessageBox from "./DisplayMessages";

const axios = require('axios');


class Conversations extends React.Component {
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

    }


    render() {

        return (
            <div className="row">
                <div className={"col-md-6 offset-3"}>
                    {
                        this.state.conversations.map(function (conversation) {
                            return (
                                <div className={"row conversationContainer"}>
                                    <div className={"col-md-5 conversationProfile"}>
                                        <div className={"row"}>
                                            <div className={"col-md-4 col-sm-4 conversationProfilePicContianer"}>
                                                <ProfilePic
                                                    cssClass={"profilePicSmall"}
                                                    userId={conversation.profileDto.id}
                                                    profilePicName={conversation.profileDto.profilePicName}
                                                />
                                            </div>
                                            <div className={"col-md-8  col-sm-8 conversationProfileNameContianer"}>
                                                <UserFullName
                                                    userId={conversation.profileDto.id}
                                                    name={conversation.profileDto.name}
                                                    surname={conversation.profileDto.surname}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <a href={"/message/"+conversation.profileDto.id} className={"col-md-7 conversationText"}>
                                    <div className={"col-md-12 "}>
                                        <span>{conversation.lastMessage}</span>
                                    </div>
                                    </a>
                                </div>)
                        })
                    }
                </div>
            </div>

        );
    }
}


export default Conversations;