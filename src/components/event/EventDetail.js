import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import EventInfo from "../common/event/EventInfo";
import EventRequestButtons from "../common/event/EventRequestButtons";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";
import EventBlock from "../common/event/EventBlock";

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
                    <EventBlock event={event}/>
                    <div className={"clear-both"}/>
                    <a href={"/messageevent/" + event.id}>
                        <button
                            className="btn btn-info eventMessageMobile">
                            <span>
                                <i className="fas fa-envelope"/> EVENT CHAT GROUP</span>
                        </button>
                    </a>
                    <hr/>

                    <div className={"full-width"}>
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
                                                       checked={request.result === "CAME"}
                                                       onChange={() => self.onResultChanged(request.id, "CAME")}
                                                       className="customRadio"
                                                />
                                                <label>Geldi</label>
                                                <br/>
                                                <input type="radio"
                                                       name={request.id + "result"}
                                                       onChange={() => self.onResultChanged(request.id, "DIDNT_CAME")}
                                                       checked={request.result === "DIDNT_CAME"}
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
                        }</div>
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