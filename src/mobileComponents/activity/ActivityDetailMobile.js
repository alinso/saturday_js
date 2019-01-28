import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import ActivityInfoBlockMobile from "../common/ActivityInfoBlockMobile";
import ActivityRequestButtonsMobile from "../common/ActivityRequestButtonsMobile";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class ActivityDetailMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state = {
            activity: {},
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get(Globals+'activity/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({activity: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    joinMeeting(id) {
        const self = this;
        axios.get(Globals.serviceUrl+'request/sendRequest/' + id, Security.authHeader())
            .then(function (response) {

                let currentMeetingNew = Object.assign({}, self.state.activity);
                currentMeetingNew.thisUserJoined = response.data;

                self.setState({activity: currentMeetingNew});
            });

    }

    render() {
        const {activity} = this.state;
        const self = this;


        console.log(activity);
        if (activity.profileDto !== undefined) {
            return (
                <div className={"full-with container"}>
                    <div className={"full-width"}>
                        <div className="float-left">
                            <ProfilePicMobile
                                cssClass={"profilePicSmallMobile"}
                                userId={activity.profileDto.id}
                                profilePicName={activity.profileDto.profilePicName}
                            />
                        </div>
                        <div className={"float-left activityListDetailContainerMobile text-align-left"}>
                            <UserFullNameMobile
                                name={activity.profileDto.name}
                                userId={activity.profileDto.id}
                                surname={activity.profileDto.surname}
                            />
                            <ActivityInfoBlockMobile photoName={activity.photoName} detail={activity.detail} hashtagListString={activity.hashtagListString}/>
                            <div className={"clear-both"}/>
                            <br/>
                            <div className={"float-left"}>
                                <i className="far fa-clock">{activity.deadLineString}</i>
                            </div>
                            <div className={"float-right"}>
                                {(!activity.expired) &&
                                (<ActivityRequestButtonsMobile
                                    userId={activity.profileDto.id}
                                    joinMeeting={() => self.joinMeeting(activity.id)}
                                    thisUserJoined={activity.thisUserJoined}
                                />)
                                }
                                {(activity.expired) &&
                                (<a href={"/activityDetail/" + activity.id}>
                                    <button className={"btn btn-warning"}><i className="fas fa-users"/>Katılanlar
                                    </button>
                                </a>)
                                }
                            </div>
                        </div>
                        <div className={"clear-both"}/>
                    </div>
                    <div className={"full-width"}>
                        <hr/>
                        Aktiviteye Katılanlar
                        {(activity.attendants) &&
                        activity.attendants.map(function (attendant) {

                            return (
                                <div className={"full-width"}>
                                    <div className={"half-left"}>
                                        <ProfilePicMobile
                                            userId={attendant.id}
                                            profilePicName={attendant.profilePicName}
                                            cssClass={"profilePicSmallMobile"}
                                        />
                                    </div>
                                    <div className="half-left">
                                        <UserFullNameMobile
                                            userId={attendant.id}
                                            name={attendant.name}
                                            surname={attendant.surname}
                                        /><br/>
                                        {UserUtil.translateGender(attendant.gender)} / {attendant.age}
                                        <br/>
                                    </div>
                                    <hr/>
                                    <div className={"clear-both"}/>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            )
        }
        if (activity.profileDto === undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default ActivityDetailMobile;