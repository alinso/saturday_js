import React from "react";
import Security from "../../security/Security";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";

const axios = require('axios');


class Reviews extends React.Component {
    constructor(props) {
        super(props);
        Security.protect()

        this.state={
            reviews:[],
            erorrs:{}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/review/reviewsOfUser/'+this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                self.setState({reviews: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    render() {
        const self = this;
        return (
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h5>Bildirim Aldığım kişiler</h5>
                    {
                        self.state.reviews.map(function (review, i) {
                            return (
                                <div className={"row"}>
                                    <div className={"col-md-3 col-sm-3"}>
                                        <ProfilePic
                                            userId = {review.writer.id}
                                            profilePicName={review.writer.profilePicName}
                                            cssClass={"profilePicMedium"}
                                        />
                                    </div>
                                    <div className={"col-md-5 col-sm-5"}>
                                        <UserFullName
                                            userId={review.writer.id}
                                            name={review.writer.name}
                                            surname={review.writer.surname}
                                        />
                                    </div>
                                    <div className={"col-md-3col-sm-3"}>
                                        {review.reviewType} - {review.positive &&(<span>pozitif</span>)}
                                        <br/>
                                        {review.review}
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