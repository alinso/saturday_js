import React from "react";
import Security from "../security/Security";
import ProfilePic from "./common/ProfilePic";
import UserFullName from "./common/UserFullName";
import BaseMeetingList from "./meeting/Base/BaseMeetingList";
import MeetingEditButtons from "./common/MeetingEditButtons";
import MeetingRequestButtons from "./common/MeetingRequestButtons";
import MeetingInfoBlock from "./common/MeetingInfoBlock";
import CityUtil from "../util/CityUtil";
import Select from 'react-select'

const axios = require('axios');
let self;

class Dashboard extends BaseMeetingList {
    constructor() {
        super();

        this.state = {
            meetings: [],
            cities: [],
            city: {}
        };

        this.fillPage = this.fillPage.bind(this);
        this.fillPage(localStorage.getItem("cityId"));
        this.loadCities();
        self = this;
    }

    fillPage(cityId) {
        const self = this;

        axios.get('http://localhost:8080/meeting/findAllByCityId/' + cityId, Security.authHeader())
            .then(function (response) {
                self.setState({meetings: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    loadCities() {
        const self = this;
        axios.get('http://localhost:8080/city/all/', Security.authHeader())
            .then(function (response) {
                let result = CityUtil.setCitiesForSelect(response.data);
                self.setState({cities: result.cities});
                self.setState({city: result.selectedCity});
            })
            .catch(function (error) {
            });

    }

    onSelectChange(e) {
        self.fillPage(e.value);
        self.setState({city: e});
    }


    render() {
        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-5 m-x-auto container">
                    <div className={"col-md-6 m-auto"}>
                            <div className={"float-left city-filter-label"}> Şehir Filtresi:&nbsp;</div>
                            <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                        <hr/>
                    </div>
                    {
                        self.state.meetings.map(function (meeting, i) {
                            return (
                                <div key={i} className={"row meetingListSingleMeetingContainer"}>
                                    <div className="col-md-2 col-sm-2 meetingListProfile">
                                        <ProfilePic
                                            userId={meeting.profileDto.id}
                                            profilePicName={meeting.profileDto.profilePicName}
                                            cssClass={"profilePicSmall"}
                                        />

                                    </div>
                                    <div className={"col-md-10 text-align-left"}>
                                        <UserFullName
                                            userId={meeting.profileDto.id}
                                            profilePicName={meeting.profileDto.profilePicName}
                                            name={meeting.profileDto.name}
                                            surname={meeting.profileDto.surname}
                                        />
                                        <MeetingInfoBlock
                                            photoName={meeting.photoName}
                                            detail={meeting.detail}
                                        />
                                        <div className={"row"}>
                                            <div className={"col-md-8 meetingDeadLine"}>
                                                <i className="far fa-clock">{meeting.deadLineString}</i>
                                            </div>
                                            <div className={"col-md-4"}>
                                                <MeetingEditButtons
                                                    meetingId={meeting.id}
                                                    userId={meeting.profileDto.id}
                                                    deleteMeeting={() => self.deleteMeeting(meeting.id)}
                                                />
                                                <MeetingRequestButtons
                                                    userId={meeting.profileDto.id}
                                                    joinMeeting={() => self.joinMeeting(meeting.id)}
                                                    thisUserJoined={meeting.thisUserJoined}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    <hr/>
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    }
}

export default Dashboard;