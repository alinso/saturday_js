import React from "react";
import Security from "../../security/Security";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";
import JSUtil from "../../util/JSUtil";

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
        axios.get(Globals.serviceUrl+'review/reviewsOfUser/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {

                let reviewsSorted = response.data;
                let r = reviewsSorted.sort(JSUtil.compareByCreatedAt);

                self.setState({reviews: r});
            })
            .catch(function (error) {
                console.log(error.response);
            });

        axios.get(Globals.serviceUrl+'user/profile/' + this.props.match.params.id)
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
            <div className=" full-width container">
                <h5>İnsanlar <a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
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
                                        cssClass={"profilePicSmallMobile"}
                                    />
                                </div>

                                <div className={"float-left reviewBlockMobile"}>
                                    <UserFullNameMobile
                                        user={review.writer}
                                    /><br/>
                                    {/*{review.positive && (*/}
                                    {/*    <strong className={"positiveReview"}><i*/}
                                    {/*        className="fas fa-check"/>OLUMLU</strong>)}*/}
                                    {/*{!review.positive && (<strong className={"negativeReview"}><i*/}
                                    {/*    className="fas fa-times"/>&nbsp;OLUMSUZ</strong>)}*/}
                                    {review.review}
                                </div>
                                <div className={"clear-both"}> </div>
                            </div>
                        );
                    })
                }
<hr/><br/>
            </div>
        )
    }
}

export default ReviewsMobile;









