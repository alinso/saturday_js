import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import UserUtil from "../../util/UserUtil";
import JSUtil from "../../util/JSUtil";
import Alert from "../common/Alert";

const axios = require('axios');


class MeetingRequests extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            photoName: null,
            detail: null,
            deadLineString:null,
            requests: null,
            errors: {}
        };

        this.fillPage();
        this.toggleApprove= this.toggleApprove.bind(this);
    }

    fillPage() {
        const self = this;

        axios.get('http://localhost:8080/meeting/requests/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({detail: response.data.detail});
                self.setState({photoName: response.data.photoName});
                self.setState({deadLineString: response.data.deadLineString});
                self.setState({requests: response.data.requests});

            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    toggleApprove(id) {
        const self = this;
        axios.get('http://localhost:8080/meeting/approveRequest/' + id, Security.authHeader())
            .then(function (response) {
                let requests = self.state.requests;
                let currentRequestOld = requests.filter(obj => {
                    return obj.id === id
                });

                let currentRequestNew = Object.assign({}, currentRequestOld)[0];
                currentRequestNew.meetingRequestStatus = response.data;

                let requestsNew = JSUtil.deleteFromArrayByPropertyName(requests, "id", id);
                requestsNew.push(currentRequestNew);
                requestsNew.sort(JSUtil.compareByRequestatus);


                self.setState({requests: requestsNew});
            })
            .catch(function (error) {

                console.log(error);
                self.setState({errors:error.response.data});
            });
    }


    render() {

        const self = this;
        return (
            <div className="row">
                <div className={"col-md-6 offset-3"}>
                    <div className={"row meetingListSingleMeetingContainer"}>
                        <div className={"col-md-12 meetingListMeetingText"}>
                            {(this.state.photoName != null) && (
                                <div className={"col-md-12"}>
                                    <img className={"meetingListPhoto col-md-8"}
                                         src={"/upload/" + this.state.photoName}/>
                                    <hr/>
                                    <br/>
                                </div>
                            )}

                            <div className={"col-md-12"}>
                                {this.state.detail}
                            </div>

                            <div className={"col-md-12 meetingListUserMeta"}>
                                <br/><br/>
                                <button className={"btn btn-warning"}> {this.state.deadLineString}</button>
                                <hr/>
                            </div>
                        </div>
                        <div className={"col-md-12"}>
                            <strong>Katılmak İsteyen Kişiler</strong>
                            <hr/>
                            {this.state.errors.userWarningMessage && (
                                <Alert
                                type={"alert-danger"}
                                message={this.state.errors.userWarningMessage}
                                />
                            )}
                        </div>
                        <div className={"col-md-12"}>
                            <div className={"row"}>
                                {this.state.requests &&
                                this.state.requests.map(function (request) {

                                    return (

                                        <div className={"col-md-3"}>
                                            <ProfilePic
                                                userId={request.profileDto.id}
                                                profilePicName={request.profileDto.profilePicName}
                                            />
                                            <UserFullName
                                                userId={request.profileDto.id}
                                                name={request.profileDto.name}
                                                surname={request.profileDto.surname}
                                            />
                                            {UserUtil.translateGender(request.profileDto.gender)} / {request.profileDto.age}
                                            <br/>
                                            {
                                                (request.meetingRequestStatus === "WAITING") &&
                                                (<button onClick={()=>self.toggleApprove(request.id)} className={"btn btn-info"}>ONAYLA</button>)
                                            }
                                            {
                                                (request.meetingRequestStatus === "APPROVED") && (
                                                    <button onClick={()=>self.toggleApprove(request.id)} className={"btn btn-danger"}>İPTAL ET</button>
                                                )
                                            }
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>

        );
    }
}


export default MeetingRequests;