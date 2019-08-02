import React from "react";
import Security from "../../../security/Security";
import classnames from "classnames";
import ProfilePic from "../../common/ProfilePicMobile";
import UserFullName from "../../common/UserFullNameMobile";
import UserUtil from "../../../util/UserUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');


class ComplainMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
       // UserUtil.redirectIsBlocked(this.props.match.params.id);


        this.state = {
            detail: "",
            guiltyProfile: {},
            errors: {},
            savedMessage:false,
            isSubmitDisabled: false,

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.saveComplain = this.saveComplain.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fillPage();
    }

    fillPage() {
        let self = this;
        axios.get(Globals.serviceUrl + 'user/profile/' + this.props.match.params.id)
            .then(function (response) {
                self.setState({guiltyProfile: response.data});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();

        const complainDto = {
            detail: this.state.detail,
            guiltyId: this.state.guiltyProfile.id
        };
        this.saveComplain(complainDto);
    }


    saveComplain(complainDto) {
        this.setState({isSubmitDisabled: true});
        const self = this;
        axios.post(Globals.serviceUrl + 'complain/create/', complainDto, Security.authHeader())
            .then(function (response) {
                self.setState({savedMessage: "Şikayetini değerlendirmeye aldık, teşekkrüler"});
                self.setState({"errors": false});

                //thank you message
            })
            .catch(function (error) {
                self.setState({isSubmitDisabled: false});
                self.setState({"errors": error.response.data});
            });
    }


    render() {

        return (
            <div className="full-width container">
                <h4>Bu profili şikayet ediyorsun</h4>
                <span>Bu profilin sana veya bir başkasına rahatsızlık verdiğini, amacı dışında
                        kullanıldığını, kısaca bu profilde bir problem olduğunu düşünüyorsan bize bildir
                        (bu aramızda kalacak), profili ve yaptıklarını inceleyeceğiz.
                        Kaliteli bir toplululuk için elimizden geleni yapıyoruz.<br/>
                        Teşekkür ederiz.
                    </span><br/><br/>
                <ProfilePic
                    userId={this.props.match.params.id}
                    profilePicName={this.state.guiltyProfile.profilePicName}
                    cssClass={"profilePicSmall"}
                />
                <UserFullName
                    user={this.state.guiltyProfile}
                />

                <form onSubmit={this.onSubmit}>
                    {this.state.savedMessage && (
                        <h5>{this.state.savedMessage}</h5>
                    )}
                    <div className="form-group">
                            <textarea
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": this.state.errors.detail
                                })}
                                placeholder="Rahatsız olduğun durumu kısaca belirt..."
                                name="detail"
                                value={this.state.detail}
                                onChange={this.onChange}
                            />
                        {this.state.errors.detail && (
                            <div className="invalid-feedback">
                                {this.state.errors.detail}
                            </div>
                        )}
                    </div>

                    <input
                        type="submit"
                        value="Gönder"
                        className="btn btn-primary btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}

                    />
                </form>
                <br/>
            </div>

        );
    }
}


export default ComplainMobile;