import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import ActivityInfoBlockMobile from "../common/ActivityInfoBlockMobile";
import ActivityRequestButtonsMobile from "../common/ActivityRequestButtonsMobile";
import BackToProfileMobile from "../common/BackToProfileMobile";

const axios = require('axios');


class ReviewDetailMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state = {
            review: {},
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/review/findById/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({review: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    render() {
        const {review} = this.state;
        const self = this;

        if (review.writer !== undefined) {
            return (
                <div className="full-width container">
                    <BackToProfileMobile/>
                    <h5>Sizin için yeni bir yorum yapıldı!</h5>
                    <div className={"full-width"}>
                        <div className={"float-left"}>
                            <ProfilePicMobile
                                userId={review.writer.id}
                                profilePicName={review.writer.profilePicName}
                                cssClass={"profilePicSmall"}
                            />
                        </div>
                        <div className={"float-left reviewBlock"}>
                            <UserFullNameMobile
                                name={review.writer.name}
                                userId={review.writer.id}
                                surname={review.writer.surname}
                            /><br/>
                            {review.positive && (
                                <strong className={"positiveReview"}><i
                                    className="fas fa-check"/>OLUMLU</strong>)}
                            {!review.positive && (<strong className={"negativeReview"}><i
                                className="fas fa-times"/>&nbsp;OLUMSUZ</strong>)}
                            , &nbsp;
                            {review.positive && (
                                <span className={"reviewTypeFriend  "}>Arkadaş Referansı</span>)}
                            {!review.positive && (
                                <strong className={"reviewTypeActivity"}>Aktivite Referansı</strong>)}

                            <hr/>
                            {review.review}
                        </div>
                    </div>
                </div>
            )
        }
        if (review.profileDto === undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default ReviewDetailMobile;