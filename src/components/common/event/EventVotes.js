import React from "react";


class EventVotes extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let myVoteDownCss="";
        let myVoteUpCss="";
        if(this.props.myVote===1)
            myVoteUpCss = "btn-success";
        else if (this.props.myVote===-1)
            myVoteDownCss ="btn-success";

        if (this.props.userId !== parseInt(localStorage.getItem("userId"))) {
            return (
                <div className={"float-left"}>

                    {this.props.event.vote}
                    <button
                        onClick={() => this.props.voteEvent(this.props.event.id,"1")}
                        className={"btn "+myVoteUpCss} >
                            <span><i
                                className="fas fa-arrow-up"/></span>
                    </button>
                    <button
                        onClick={() => this.props.voteEvent(this.props.event.id,"-1")}
                        className={"btn"+myVoteDownCss }>
                            <span><i
                                className="fas fa-arrow-down"/></span>
                    </button>
                </div>)
        }
        else {
            return "";
        }
    }
}


export default EventVotes;

