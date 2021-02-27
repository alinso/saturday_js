import React from "react";
import Globals from "../../../util/Globals";
import Security from "../../../security/Security";

const axios = require('axios');

class EventVotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myVote: this.props.event.myVote,
            vote: this.props.event.vote,
        }
    }

    voteEvent(id, vote) {
        let self = this;
        axios.get(Globals.serviceUrl + "eventVote/save/" + id + "/" + vote, Security.authHeader())
            .then(res => {
                self.setState({myVote: vote});
                self.setState({vote: res.data});
            });
    }


    render() {

        let voteUpCss, voteDownCss = "";
        if (this.state.myVote == 1) {
            voteUpCss = "color-blue";
        } else if (this.state.myVote == -1) {
            voteDownCss = "color-blue";
        }

        if (this.props.userId !== parseInt(localStorage.getItem("userId"))) {
            return (
                <div className={"float-left"}>

                    {this.state.vote}
                    <button
                        onClick={() => this.voteEvent(this.props.event.id, "1")}
                        className={"btn "}>
                            <span><i
                                className={voteUpCss + " fas fa-arrow-up"}/></span>
                    </button>
                    <button
                        onClick={() => this.voteEvent(this.props.event.id, "-1")}
                        className={"btn "}>
                            <span><i
                                className={voteDownCss + " fas fa-arrow-down"}/></span>
                    </button>
                </div>)
        } else {
            return "";
        }
    }
}


export default EventVotes;

