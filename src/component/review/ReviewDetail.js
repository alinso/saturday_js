import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import MeetingInfoBlock from "../common/MeetingInfoBlock";
import MeetingRequestButtons from "../common/MeetingRequestButtons";
const axios = require('axios');


class ReviewDetail extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state={
            review:{},
            erorrs:{}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/review/findById/'+this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({review: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    render() {
        const {review}  =this.state;
        const self = this;

        if(review.writer!==undefined){
            return (
                <div className={"row meetingListSingleMeetingContainer"}>
                    <div className="col-md-6 meetingListProfile">
                        <ProfilePic
                            userId={review.writer.id}
                            profilePicName={review.writer.profilePicName}
                        />
                        <UserFullName
                            name={review.writer.name}
                            userId={review.writer.id}
                            surname={review.writer.surname}
                        />
                    </div>
                    <div className="col-md-6 meetingListProfile">
                        <ProfilePic
                            userId={review.reader.id}
                            profilePicName={review.reader.profilePicName}
                        />
                        <UserFullName
                            name={review.reader.name}
                            userId={review.reader.id}
                            surname={review.reader.surname}
                        />
                    </div>
                    <div className={"col-md-9 "}>
                        {review.review}
                        <br/>{review.reviewType}
                    </div>
                    <hr/>
                </div>
            )}
        if(review.profileDto===undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default ReviewDetail;