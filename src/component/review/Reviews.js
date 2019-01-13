import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import UserUtil from "../../util/UserUtil";

const axios = require('axios');


class Reviews extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            reviews: [],
            profileDto:{},
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
            <div className="row outer">
                <div className="col-md-5 m-x-auto container">
                    <h5>İnsanlar <a href={"/profile/" + this.props.match.params.id} className={"profileTitle"}>
                        <i className="fas fa-comments"/> {self.state.profileDto.name +" "+self.state.profileDto.surname}</a> için ne diyor?
                    </h5>
                    <hr/>

                    {(self.state.reviews.length===0) &&(
                        <h5>
                        Henüz kimse yorum yapmamış.
                        </h5>
                    )}

                    {
                        self.state.reviews.map(function (review, i) {
                            return (
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
                                            userId={review.writer.id}
                                            name={review.writer.name}
                                            surname={review.writer.surname}
                                        />

                                        <div className={"reviewBlock"}>
                                            {review.positive && (
                                                <strong className={"positiveReview"}><i className="fas fa-check"/>OLUMLU</strong>)}
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
                                    <div className={"col-md-12"}>
                                        <hr/>
                                    </div>
                                </div>

                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Reviews;









