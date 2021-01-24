import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import EventInfoBlock from "../common/EventInfoBlock";
import EventRequestButtons from "../common/EventRequestButtons";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state = {
            event: {},
            erorrs: {},
        };

        this.onResultChanged = this.onResultChanged.bind(this);
        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl + 'event/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({event: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    joinEvent(id) {
        const self = this;

        axios.get(Globals.serviceUrl + 'vote/votePercentOfOrganiser/' + id, Security.authHeader())
            .then(function (response) {

                let question = "Bu aktiviteye katılmak istediğinden emin misin?";
                if (response.data < 75 && response.data !== 0) {
                    question = "Bu kişinin OLUMLU İZLENİM ORANI düşük, aktivitesine KATILMAMANI tavsiye ederiz";
                }

                if (self.state.event.thisUserJoined === 1 || self.state.event.thisUserJoined === 2)
                    question = "Bu aktiviteden isteğini geri çekmek istediğine emin misin?";

                let result = window.confirm(question);
                if (!result)
                    return;


                axios.get(Globals.serviceUrl + 'request/sendRequest/' + id, Security.authHeader())
                    .then(function (response) {

                        let currentMeetingNew = Object.assign({}, self.state.event);
                        currentMeetingNew.thisUserJoined = response.data;

                        self.setState({event: currentMeetingNew});
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
        const {event} = this.state;
        const self = this;


        if (event.profileDto !== undefined) {
            return (
                <div className={"full-with container"}>
                    <div className={"full-width"}>
                        <div className="float-left">
                            <ProfilePic
                                cssClass={"profilePicSmallMobile"}
                                userId={event.profileDto.id}
                                profilePicName={event.profileDto.profilePicName}
                            />
                        </div>
                        <div className={"float-left eventListDetailContainerMobile text-align-left"}>
                            <UserFullName
                                user={event.profileDto}
                            />
                            <EventInfoBlock photoName={event.photoName} detail={event.detail}
                                            interests={event.interests}/>
                            <div className={"clear-both"}/>
                            <br/>
                            <div className={"float-left"}>
                                <i className="far fa-clock">{event.deadLineString}</i>
                            </div>
                            <div className={"float-right"}>
                                {(!event.expired) &&
                                (<EventRequestButtons
                                    userId={event.profileDto.id}
                                    joinevent={() => self.joinEvent(event.id)}
                                    thisUserJoined={event.thisUserJoined}
                                />)
                                }
                                {(event.expired) &&
                                (<a href={"/eventDetail/" + event.id}>
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
                        <h5><a href={"/messageevent/" + event.id}> <i className="fas fa-envelope"/> Grup Sohbetine
                            Katıl</a></h5>
                        <hr/>
                        Aktiviteye Katılanlar<br/>
                        <span className={"messageWarning"}>Yalnız Gold üyeler ve onaylanmıs katılımcılar diğer katılımcıları görebilir</span>
                        {(event.requests) &&
                        event.requests.map(function (request) {
                            return (
                                <div className={"full-width"}>
                                    <div className={"half-left"}>
                                        <ProfilePic
                                            userId={request.profileDto.id}
                                            profilePicName={request.profileDto.profilePicName}
                                            cssClass={"profilePicSmallMobile"}
                                        />
                                        <br/>
                                        <UserFullName
                                            user={request.profileDto}
                                        />
                                        <br/>
                                    </div>
                                    <div className="half-left text-align-left">
                                        {(event.profileDto.id === parseInt(localStorage.getItem("userId")) && event.expired) && (
                                            <div className="form-group">
                                                <input type="radio"
                                                       name={request.id + "result"}
                                                       checked={request.result === 1}
                                                       onChange={() => self.onResultChanged(request.id, 1)}
                                                       className="customRadio"
                                                />
                                                <label>Geldi</label>
                                                <br/>
                                                <input type="radio"
                                                       name={request.id + "result"}
                                                       onChange={() => self.onResultChanged(request.id, 0)}
                                                       checked={request.result === 0}
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
        if (event.profileDto === undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default EventDetail;