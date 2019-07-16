import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import Globals from "../../util/Globals";

const axios = require('axios');


class ConversationsActivityMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            conversations: [],
            errors: {},
            pageNum: 0,
            noMoreRecords: false
        };

        this.fillPage();

    }

    fillPage() {

        let self = this;

        axios.get(Globals.serviceUrl + 'activity/findByUserId/' + localStorage.getItem("userId"), Security.authHeader())
            .then(function (response) {

                let arr = response.data;
                let arr2 = arr.sort(function(a, b) {
                    return b.id-a.id;
                });

                self.setState({conversations: arr2});

            })
    }


    render() {
        let i = 0;
        return (
            <div className={"full-width container"}>
                <a href={"conversations"}>
                    <button className={"btn btn-info"}><i className="fas fa-user"/> Kişilerle Mesajlar</button>
                </a>
                <hr/>
                <h5 className={"profileTitleMobile"}><i className="fas fa-comments"/> Aktivite Sohbetleri</h5>
                <hr/>
                {
                    this.state.conversations.map(function (conversation) {
                        i++;
                        if (i > 70)
                            return null;

                        return (
                            <div>
                                <a href={"messageActivity/" + conversation.id}>
                                    <h6>Aktivite {conversation.id} (<strong>{conversation.profileDto.name + " " + conversation.profileDto.surname}</strong>)</h6>
                                </a>
                                <hr/>
                            </div>
                        )
                    })
                }

                <br/><br/><br/>

            </div>
        );
    }
}


export default ConversationsActivityMobile;