import ProfilePic from "../ProfilePic";
import UserFullName from "../UserFullName";
import EventInfoBlock from "./EventInfoBlock";
import EventEditButtons from "./EventEditButtons";
import EventRequestButtons from "./EventRequestButtons";
import React from "react";
import EventVotes from "./EventVotes";


class EventListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

         let selectedClass = "";

        return (
            <div className={"row meetingListSingleMeetingContainer " + selectedClass}>
                <div className="float-left">
                    <ProfilePic
                        userId={this.props.event.profileDto.id}
                        profilePicName={this.props.event.profileDto.profilePicName}
                        cssClass={"profilePicSmallMobile"}
                    />
                </div>
                <div className={"eventListDetailContainerMobile float-left text-align-left"}>
                    <UserFullName
                        user={this.props.event.profileDto}
                    />
                    {(localStorage.getItem("userId") === "1") &&
                    (
                        <div className={"full-width"}>
                            <a href={"/uhktybb/police"} className={"float-left"}>
                                <button className={"btn btn-danger"}>Kullanıcı(id:{this.props.event.profileDto.id})
                                </button>
                            </a>
                            <a href={"/eventRequests/" + this.props.event.id} className={"float-left"}>
                                <button className={"btn btn-primary float-left"}>Aktivite</button>
                            </a>
                            <div className={"clear-both"}/>
                        </div>
                    )}
                    <EventInfoBlock
                        photoName={this.props.event.photoName}
                        detail={this.props.event.detail}
                        interests={this.props.event.interests}
                    />
                    <br/>
                    <div className={"float-left"}>
                        <EventRequestButtons
                            userId={this.props.event.profileDto.id}
                            joinevent={() => this.props.joinevent(this.props.event.id)}
                            thisUserJoined={this.props.event.thisUserJoined}
                        />
                        <EventVotes
                            event = {this.props.event}
                            voteEvent={this.props.voteEvent}
                            />
                        <a href={"/messageevent/" + this.props.event.id}>
                            <button
                                className="btn btn-info eventMessageMobile">
                            <span>
                                <i
                                    className="fas fa-envelope"/></span>
                            </button>
                        </a>
                        <a href={"/eventDetail/" + this.props.event.id}>
                            <button
                                className="btn btn-danger eventMessageMobile">
                            <span>
                                <i
                                    className="fas fa-users"/></span>
                            </button>
                        </a>

                    </div>
                    <EventEditButtons
                        eventId={this.props.event.id}
                        userId={this.props.event.profileDto.id}
                        deleteevent={() => this.props.deleteevent(this.props.event.id)}
                    />


                    <div className={"float-right"}>
                        <i className="far fa-clock">{this.props.event.deadLineString}</i>
                    </div>
                    <br/><br/>
                    {(this.props.event.expired) &&
                    (<a href={"/eventDetail/" + this.props.event.id} className={"float-right"}>
                        <button className={"btn btn-warning"}><i className="fas fa-users"/>Katılanlar
                        </button>

                    </a>)
                    }
                </div>

            </div>
        )

    }
}


export default EventListItem;


