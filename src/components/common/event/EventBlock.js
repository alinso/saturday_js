import ProfilePic from "../ProfilePic";
import UserFullName from "../UserFullName";
import EventInfo from "./EventInfo";
import EventRequestButtons from "./EventRequestButtons";
import React from "react";
import EventVotes from "./EventVotes";
import Security from "../../../security/Security";


class EventBlock extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
    }



    render() {

        return (
            <div className={"row meetingListSingleMeetingContainer"}>
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
                    <EventInfo
                        photoName={this.props.event.photoName}
                        detail={this.props.event.detail}
                        interests={this.props.event.interests}
                    />
                    <br/>
                    <div className={"float-left"}>
                        {this.props.event.profileDto.id !== parseInt(localStorage.getItem("userId")) &&  (!this.props.event.expired) &&(
                            <EventRequestButtons
                            event={ this.props.event}
                            />
                            )}
                        <EventVotes event = {this.props.event}/>
                        <a href={"/eventDetail/" + this.props.event.id}>
                            <button
                                className="btn btn-danger eventMessageMobile">
                            <span>
                                <i
                                    className="fas fa-align-justify"/></span>
                            </button>
                        </a>

                    </div>
                    { (this.props.event.profileDto.id === parseInt(localStorage.getItem("userId"))) && (
                        <a href={"/eventSettings/" + this.props.event.id}>
                            <button className="btn btn-success meetingProcess">
                                <i className="fas fa-cog"/>
                            </button>
                        </a>
                        )}


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


export default EventBlock;


