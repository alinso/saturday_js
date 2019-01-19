import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import UserUtil from "../../util/UserUtil";

const axios = require('axios');


class ReviewsMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            reviews: [],
            profileDto: {},
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/review/reviewsOfUser/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({reviews: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

        axios.get('http://localhost:8080/user/profile/' + this.props.match.params.id)
            .then(function (response) {
                self.setState({"profileDto": response.data});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });

    }

    render() {
        const self = this;

        return (
            <div className="container">
                <h5>İnsanlar <a href={"/profile/" + this.props.match.params.id} className={"profileTitle"}>
                    <i className="fas fa-comments"/> {self.state.profileDto.name + " " + self.state.profileDto.surname}
                </a> için ne diyor?
                </h5>
                <hr/>

                {(self.state.reviews.length === 0) && (
                    <h5>
                        Henüz kimse yorum yapmamış.
                    </h5>
                )}

                {
                    self.state.reviews.map(function (review, i) {
                        return (
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
                                        userId={review.writer.id}
                                        name={review.writer.name}
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
                                    <br/>
                                    {review.review}
                                </div>
                            </div>

                        );
                    })
                }
            </div>
        )
    }
}

export default ReviewsMobile;









