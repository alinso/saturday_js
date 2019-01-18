import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import ActivityInfoBlockMobile from "../common/ActivityInfoBlockMobile";
import ActivityRequestButtonsMobile from "../common/ActivityRequestButtonsMobile";
import UserUtil from "../../util/UserUtil";

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
        axios.get('http://localhost:8080/activity/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({activity: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    joinMeeting(id) {
        const self = this;
        axios.get('http://localhost:8080/request/sendRequest/' + id, Security.authHeader())
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
                <div className={"row outer"}>
                    <div className={"col-md-6 container"}>
                        <div className={"row"}>
                            <div className="col-md-2 meetingListProfile">
                                <ProfilePicMobile
                                    cssClass={"profilePicMedium"}
                                    userId={activity.profileDto.id}
                                    profilePicName={activity.profileDto.profilePicName}
                                />
                            </div>
                            <div className={"col-md-9 text-align-left"}>
                                <UserFullNameMobile
                                    name={activity.profileDto.name}
                                    userId={activity.profileDto.id}
                                    surname={activity.profileDto.surname}
                                />
                                <ActivityInfoBlockMobile photoName={activity.photoName} detail={activity.detail}/>
                                <div className={"row"}>
                                    <div className={"col-md-9 meetingListUserMeta"}>
                                        <button className={"btn btn-warning"}> {activity.deadLineString}</button>
                                    </div>
                                    <div className={"col-md-3"}>
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
                            </div>
                        </div>
                        <hr/>
                        <div className={"col-md-12"}>
                            Aktiviteye Katılanlar
                            <hr/>
                            <div className={"row"}>
                                {(activity.attendants) &&
                                activity.attendants.map(function (attendant) {

                                    return (

                                        <div className={"col-md-3"}>
                                            <ProfilePicMobile
                                                userId={attendant.id}
                                                profilePicName={attendant.profilePicName}
                                                cssClass={"profilePicMedium"}
                                            />
                                            <UserFullNameMobile
                                                userId={attendant.id}
                                                name={attendant.name}
                                                surname={attendant.surname}
                                            />
                                            {UserUtil.translateGender(attendant.gender)} / {attendant.age}
                                            <br/>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
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