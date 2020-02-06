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
            erorrs: {},
        };

        this.onResultChanged = this.onResultChanged.bind(this);
        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl + 'activity/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({activity: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    joinActivity(id) {
        const self = this;

        axios.get(Globals.serviceUrl + 'vibe/vibePercentOfActivityOwner/' + id, Security.authHeader())
            .then(function (response) {

                let question="Bu aktiviteye katılmak istediğinden emin misin?";
                if(response.data<75 &&  response.data!==0){
                    question="Bu kişinin OLUMLU İZLENİM ORANI düşük, aktivitesine KATILMAMANI tavsiye ederiz";
                }

                if(self.state.activity.thisUserJoined===1 || self.state.activity.thisUserJoined===2)
                    question="Bu aktiviteden isteğini geri çekmek istediğine emin misin?";

                let result=window.confirm(question);
                if(!result)
                    return;


                axios.get(Globals.serviceUrl + 'request/sendRequest/' + id, Security.authHeader())
                    .then(function (response) {

                        let currentMeetingNew = Object.assign({}, self.state.activity);
                        currentMeetingNew.thisUserJoined = response.data;

                        self.setState({activity: currentMeetingNew});
                    });

            });
    }

    onResultChanged(requestId, result) {
        let self = this;
        axios.get(Globals.serviceUrl + 'request/requestResult/' + requestId + '/' + result, Security.authHeader())
            .then(function (response) {
                self.fillPage();
            });
    }


    render() {
        const {activity} = this.state;
        const self = this;


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
                                user={activity.profileDto}
                            />
                            <ActivityInfoBlockMobile photoName={activity.photoName} detail={activity.detail}
                                                     hashtagListString={activity.hashtagListString}/>
                            <div className={"clear-both"}/>
                            <br/>
                            <div className={"float-left"}>
                                <i className="far fa-clock">{activity.deadLineString}</i>
                            </div>
                            <div className={"float-right"}>
                                {(!activity.expired) &&
                                (<ActivityRequestButtonsMobile
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
                        <div className={"clear-both"}/>
                    </div>
                    <div className={"full-width"}>
                        <hr/>
                        <h5><a href={"/messageActivity/" + activity.id}> <i className="fas fa-envelope"/> Grup Sohbetine
                            Katıl</a></h5>
                        <hr/>
                        Aktiviteye Katılanlar<br/>
                        <span className={"messageWarning"}>Yalnız Gold üyeler ve onaylanmıs katılımcılar diğer katılımcıları görebilir</span>
                        {(activity.requests) &&
                        activity.requests.map(function (request) {
                            return (
                                <div className={"full-width"}>
                                    <div className={"half-left"}>
                                        <ProfilePicMobile
                                            userId={request.profileDto.id}
                                            profilePicName={request.profileDto.profilePicName}
                                            cssClass={"profilePicSmallMobile"}
                                        />
                                        <br/>
                                        <UserFullNameMobile
                                            user={request.profileDto}
                                        />
                                        <br/>
                                    </div>
                                    <div className="half-left">
                                        {(activity.profileDto.id===parseInt(localStorage.getItem("userId")) && activity.expired) && (
                                            <div className="form-group">
                                                <input type="radio"
                                                       name={request.id+"result"}
                                                       checked={request.result===1}
                                                       onChange={() => self.onResultChanged(request.id, 1)}
                                                       className="customRadio"
                                                />
                                                <label>Geldi&nbsp;</label>

                                                <input type="radio"
                                                       name={request.id+"result"}
                                                       onChange={() => self.onResultChanged(request.id, 0)}
                                                       checked={request.result===0}
                                                       className="customRadio"
                                                />
                                                <label>Gelmedi&nbsp;</label>
                                            </div>
                                        )}
                                    </div>


                                    <div className={"clear-both"}/>
                                </div>
                            )
                        })
                        }
                    </div>
                    <hr/>
                    <br/>
                    <br/>
                </div>
            )
        }
        if (activity.profileDto === undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default ActivityDetailMobile;