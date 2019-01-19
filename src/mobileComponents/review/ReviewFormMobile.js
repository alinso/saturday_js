import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import UserUtil from "../../util/UserUtil";

const axios = require('axios');


class ReviewFormMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            review: "",
            reviewType: "",
            profileDto: {},
            isPositive: true,
            saved: false,
            label: "",
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.saveReference = this.saveReference.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fillPage();
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();

        if (!window.confirm("Yorumlar silinemez ve düzenlenemez, kaydetmek istediğinizden emin misiniz?"))
            return false;

        const reference = {
            review: this.state.review,
            reader: this.state.profileDto,
            positive: this.state.isPositive,
            reviewType: this.state.reviewType
        };
        this.saveReference(reference);
    }


    saveReference(referenceDto) {

        const self = this;
        axios.post('http://localhost:8080/review/writeReview/', referenceDto, Security.authHeader())
            .then(function (response) {
                self.setState({saved: true});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    fillPage() {

        let self = this;

        //get the reader user
        axios.get('http://localhost:8080/user/profile/' + this.props.match.params.id)
            .then(function (response) {

                self.setState({profileDto: response.data});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });


        axios.get('http://localhost:8080/review/haveIMeetThisUserRecently/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {

                //we have met
                if (response.data) {
                    const label = self.state.profileDto.name + " ile buluştunuz, nasıl bir deneyimdi referans olur musunuz? yorumlar silinemez ve düzenlenemez";
                    self.setState({label: label});
                    self.setState({reviewType: "MEETING"});
                }

                //we not
                if (!response.data) {
                    const label = "Bir Yorum Yazın, (yorumlar silinemez ve düzenlenemez)";
                    self.setState({label: label});
                    self.setState({reviewType: "FRIEND"});
                }
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });


    }


    render() {
        let disabled = false;
        let {label} = this.state;
        if (this.state.saved) {
            disabled = true;
            label = "Yorumunuz kaydedildi, topluluğumuza katkıda bulunduğunuz için teşekür ederiz";
        }

        return (
            <div className={"full-width container"}>
                <ProfilePicMobile
                    userId={this.props.match.params.id}
                    profilePicName={this.state.profileDto.profilePicName}
                    cssClass={"profilePicSmall"}
                /> &nbsp;
                <UserFullNameMobile
                    name={this.state.profileDto.name}
                    surname={this.state.profileDto.surname}
                    userId={this.state.profileDto.id}
                />
                <br/><br/>
                <span>{label}</span>


                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                            <textarea
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": this.state.errors.review
                                })}
                                placeholder={"Bize " + this.state.profileDto.name + " hakkında birşeyler anlatın..."}
                                name="review"
                                value={this.state.review}
                                onChange={this.onChange}
                                disabled={disabled}
                            />
                        {this.state.errors.reference && (
                            <div className="invalid-feedback">
                                {this.state.errors.review}
                            </div>
                        )}
                        {
                            this.state.errors.userWarningMessage && (
                                <span>{this.state.errors.userWarningMessage}</span>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <label className="customRadioLabel">Olumlu&nbsp;</label>
                        <input type="radio"
                               name="isPositive"
                               value={true}
                               onChange={this.onChange}
                               className="customRadio"
                        />&nbsp;&nbsp;&nbsp;&nbsp;
                        <label className="customRadioLabel">Olumsuz&nbsp;</label>
                        <input type="radio"
                               name="isPositive"
                               onChange={this.onChange}
                               value={false}
                               className="customRadio"
                        />
                        <br/>
                        <div className="invalid-feedback">
                            {this.state.errors.isPositive}
                        </div>

                    </div>

                    <input
                        type="submit"
                        value="Yorumu Kaydet"
                        className="btn btn-primary btn-block mt-4"
                        disabled={disabled}
                    />
                </form>
                <br/>
            </div>

        );
    }
}


export default ReviewFormMobile;