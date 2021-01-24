import ProfilePic from "./ProfilePic";
import UserFullName from "./UserFullName";
import EventInfoBlock from "./EventInfoBlock";
import EventEditButtons from "./EventEditButtons";
import EventRequestButtons from "./EventRequestButtons";
import React from "react";


class EventListItem extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

         let selectedClass = "";
        // if (this.props.activity.id === 2545)
        //     selectedClass = "selectedActivity";


        return (
            <div className={"row meetingListSingleMeetingContainer " + selectedClass}>
                <div className="float-left">
                    <ProfilePic
                        userId={this.props.activity.profileDto.id}
                        profilePicName={this.props.activity.profileDto.profilePicName}
                        cssClass={"profilePicSmallMobile"}
                    />
                </div>
                <div className={"activityListDetailContainerMobile float-left text-align-left"}>
                    <UserFullName
                        user={this.props.activity.profileDto}
                    />
{/*                    {this.props.activity.profileDto.socialScore>0 &&(*/}
{/*                        <div className="progress" style={{width:"50%"}}>*/}
{/*                            <div className="progress-bar-striped bg-info" role="progressbar"*/}
{/*                                 style={{width: (this.props.activity.profileDto.socialScore /10)+ '%',color:"white"}} aria-valuenow={this.props.activity.profileDto.socialScore}*/}
{/*                                 aria-valuemin="0" aria-valuemax="1000">{" "+this.props.activity.profileDto.socialScore}*/}
{/*                            </div>*/}
{/*                        </div>*/}
{/*                    )}*/}
{/*                    {this.props.activity.profileDto.socialScore===-1 && this.props.activity.profileDto.id!== 3212 &&(*/}
{/*                        <h6><strong><i className="fas fa-glass-cheers"/></strong>Yeterli veri yok</h6>*/}
{/*x*/}
{/*                    )}*/}
                    {(localStorage.getItem("userId") === "3212") &&
                    (
                        <div className={"full-width"}>
                            <a href={"/uhktybb/police"} className={"float-left"}>
                                <button className={"btn btn-danger"}>Kullanıcı(id:{this.props.activity.profileDto.id})
                                </button>
                            </a>
                            <a href={"/activityRequests/" + this.props.activity.id} className={"float-left"}>
                                <button className={"btn btn-primary float-left"}>Aktivite</button>
                            </a>
                            <div className={"clear-both"}/>
                        </div>
                    )}
                    <EventInfoBlock
                        photoName={this.props.activity.photoName}
                        detail={this.props.activity.detail}
                        categories={this.props.activity.categories}
                    />
                    <br/>
                    <div className={"float-left"}>
                        <EventRequestButtons
                            userId={this.props.activity.profileDto.id}
                            joinActivity={() => this.props.joinActivity(this.props.activity.id)}
                            thisUserJoined={this.props.activity.thisUserJoined}
                        />
                        <a href={"/messageActivity/" + this.props.activity.id}>
                            <button
                                className="btn btn-info activityMessageMobile">
                            <span>
                                <i
                                    className="fas fa-envelope"/></span>
                            </button>
                        </a>
                        <a href={"/activityDetail/" + this.props.activity.id}>
                            <button
                                className="btn btn-danger activityMessageMobile">
                            <span>
                                <i
                                    className="fas fa-users"/></span>
                            </button>
                        </a>

                    </div>
                    <EventEditButtons
                        activityId={this.props.activity.id}
                        userId={this.props.activity.profileDto.id}
                        deleteActivity={() => this.props.deleteActivity(this.props.activity.id)}
                    />


                    <div className={"float-right"}>
                        <i className="far fa-clock">{this.props.activity.deadLineString}</i>
                    </div>
                    <br/><br/>
                    {(this.props.activity.expired) &&
                    (<a href={"/activityDetail/" + this.props.activity.id} className={"float-right"}>
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


