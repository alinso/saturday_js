import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import Globals from "../../util/Globals";

const axios = require('axios');


class ConversationsEvent extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            conversations: [],
            errors: {},
            pageNum: 0,
            noMoreRecords: false
        };
        this.fillPage = this.fillPage.bind(this);
        this.loadMore = this.loadMore.bind(this);

        this.fillPage(0);

    }


    loadMore() {
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        this.fillPage(newPageNum);
    }

    fillPage(pageNum) {

        let self = this;

        axios.get(Globals.serviceUrl + 'activity/findByUserId/' + localStorage.getItem("userId") + "/" + pageNum, Security.authHeader())
            .then(function (response) {

                if (response.data.length == 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }


                let arr = response.data;
                let arr2 = arr.sort(function (a, b) {
                    return b.id - a.id;
                });


                let newConversations = self.state.conversations;
                newConversations = newConversations.concat(arr2);
                self.setState({conversations: newConversations});

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
                                    <h6>Aktivite {conversation.id} (<strong>{conversation.profileDto.name + " " + conversation.profileDto.surname}</strong>)
                                    </h6>
                                </a>
                                <hr/>
                            </div>
                        )
                    })
                }
                <br/>
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>

                <br/><br/><br/>

            </div>
        );
    }
}


export default ConversationsEvent;