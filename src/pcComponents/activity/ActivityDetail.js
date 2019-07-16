import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import ActivityInfoBlock from "../common/ActivityInfoBlock";
import ActivityRequestButtons from "../common/ActivityRequestButtons";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class ActivityDetail extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state = {
            activity: {},
            erorrs: {},
            userWarning:""
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl+'activity/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({activity: response.data});
            })


    }

    joinActivity(id) {
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
                <div className={"row outer"}>
                    <div className={"col-md-6 container"}>
                        <div className={"row"}>
                            <div className="col-md-2 meetingListProfile">
                                <ProfilePic
                                    cssClass={"profilePicMedium"}
                                    userId={activity.profileDto.id}
                                    profilePicName={activity.profileDto.profilePicName}
                                />
                            </div>
                            <div className={"col-md-9 text-align-left"}>
                                <UserFullName user={activity.profileDto}/>
                                <ActivityInfoBlock photoName={activity.photoName} detail={activity.detail} hashtagListString={activity.hashtagListString}/>
                                <div className={"row"}>
                                    <div className={"col-md-9 meetingListUserMeta"}>
                                        <button className={"btn btn-warning"}> {activity.deadLineString}</button>
                                    </div>
                                    <div className={"col-md-3"}>
                                        {(!activity.expired) &&
                                        (<ActivityRequestButtons
                                            userId={activity.profileDto.id}
                                            joinActivity={() => self.joinActivity(activity.id)}
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
                            Aktiviteye Katılanlar<br/>
                            (Katılmadıysan katılanları göremezsin)
                            <hr/>
                            <div className={"row"}>
                                {(activity.attendants) &&
                                activity.attendants.map(function (attendant) {
                                    return (

                                        <div className={"col-md-3"}>
                                            <ProfilePic
                                                userId={attendant.id}
                                                profilePicName={attendant.profilePicName}
                                                cssClass={"profilePicMedium"}
                                            />
                                            <UserFullName user={attendant}/>
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

export default ActivityDetail;