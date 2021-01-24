import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
import UserUtil from "../../util/UserUtil";
import Globals from "../../util/Globals";

const axios = require('axios');


class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
     //   UserUtil.redirectIsBlocked(this.props.match.params.id);

        this.state = {
            review: "",
            profileDto: {},
            isPositive: true,
            saved: false,
            label: "",
            canItext:false,
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.saveReference = this.saveReference.bind(this);
        this.onChange = this.onChange.bind(this);
      //  this.canItext=this.canItext.bind(this);
      //  this.canItext();
        this.fillPage();
    }
    // canItext() {
    //     const self = this;
    //     axios.get(Globals.serviceUrl + 'message/haveTheseUsersMeet/'+this.props.match.params.id+'/'+localStorage.getItem("userId"), Security.authHeader())
    //         .then(function (response) {
    //             self.setState({"canItext":response.data});
    //
    //         })
    //         .catch(function (error) {
    //             self.setState({"errors": error.response.data});
    //         });
    // }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();

        if (!window.confirm("Yorumu kaydetmek istediğinden emin  misin?"))
            return false;

        const reference = {
            review: this.state.review,
            reader: this.state.profileDto,
            positive: true,
            reviewType: "MEETING"
        };
        this.saveReference(reference);
    }


    saveReference(referenceDto) {

        const self = this;
        axios.post(Globals.serviceUrl+'review/writeReview/', referenceDto, Security.authHeader())
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
        axios.get(Globals.serviceUrl+'user/profile/' + this.props.match.params.id)
            .then(function (response) {

                self.setState({profileDto: response.data});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });


        axios.get(Globals.serviceUrl+'review/haveIMeetThisUserRecently/' + this.props.match.params.id, Security.authHeader())
            .then(function (response) {
                //we have met
                if (response.data) {
                    const label = self.state.profileDto.name + " ile buluştun, hakkında neler söylemek istersin. Yorumu istediğin zama silebilir ve yeniden yazabilirsin.";
                    self.setState({label: label});
                    self.setState({"canItext":true});
                }
                else{
                    self.setState({"canItext":false});
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
            label = "Yorumun kaydedildi, topluluğumuza katkıda bulunduğun için teşekür ederiz";
        }

        return (
            <div className={"full-width container"}>
                <ProfilePic
                    userId={this.props.match.params.id}
                    profilePicName={this.state.profileDto.profilePicName}
                    cssClass={"profilePicSmallMobile"}
                /> &nbsp;
                <UserFullName
                    user={this.state.profileDto}
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
                        {this.state.errors.review && (
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
                    {/*<div className="form-group">*/}
                    {/*    <label className="customRadioLabelMobile">Olumlu&nbsp;</label>*/}
                    {/*    <input type="radio"*/}
                    {/*           name="isPositive"*/}
                    {/*           value={true}*/}
                    {/*           onChange={this.onChange}*/}
                    {/*           className="customRadio"*/}
                    {/*           checked={this.state.isPositive}*/}
                    {/*    />&nbsp;&nbsp;&nbsp;&nbsp;*/}
                    {/*    <label className="customRadioLabelMobile">Olumsuz&nbsp;</label>*/}
                    {/*    <input type="radio"*/}
                    {/*           name="isPositive"*/}
                    {/*           onChange={this.onChange}*/}
                    {/*           value={false}*/}
                    {/*           className="customRadio"*/}
                    {/*    />*/}


                    {/*</div>*/}



                    {this.state.canItext && (
                        <input
                            type="submit"
                            value="Yorumu Kaydet"
                            className="btn btn-primary btn-block mt-4"
                            disabled={disabled}
                        />
                    )}

                    {!this.state.canItext && (
                        <div>
                                <span>Bu kişi ile yakın zamanda buluşmadın, buluşmadan 1 saat sonra - 5 gün içinde yorum yapabilirsin.
                                    Sosyalleşmek için bir aktivite oluşturabilir veya birine katılabilirsin :)</span>
                        </div>
                    )}

                </form>
                <br/>
            </div>

        );
    }
}


export default ReviewForm;