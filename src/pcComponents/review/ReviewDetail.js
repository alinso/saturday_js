import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import Globals from "../../util/Globals";

const axios = require('axios');


class ReviewDetail extends React.Component {
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
        axios.get(Globals.serviceUrl+'review/findById/' + this.props.match.params.id, Security.authHeader())
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
                <div className={"row outer"}>
                    <div className="col-md-6 container">
                        <h5>Sizin için yeni bir yorum yapıldı!</h5>
                        <div className={"row"}>
                            <div className={"col-md-2 col-sm-2"}>
                                <ProfilePic
                                    userId={review.writer.id}
                                    profilePicName={review.writer.profilePicName}
                                    cssClass={"profilePicMedium"}
                                />
                            </div>
                            <div className={"col-md-10 col-sm-10 text-align-left"}>
                                <UserFullName
                                    name={review.writer.name}
                                    userId={review.writer.id}
                                    surname={review.writer.surname}
                                />
                                <div className={"reviewBlock"}>
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
                    </div>
                </div>
            )
        }
        if (review.profileDto === undefined) {
            return (<span>yükleniyor</span>)
        }
    }
}

export default ReviewDetail;