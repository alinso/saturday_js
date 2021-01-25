import React from "react";
import classnames from "classnames";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class ApplicationForm extends React.Component {
    constructor() {
        super();

        if (localStorage.getItem("jwtToken")) {
            Security.logout();
        }

        this.state = {
            name: "",
            surname: "",
            phone: "",
            about:"",
            isSubmitDisabled: false,
            applicationCompleted: false,
            userGuide:false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    saveApplicant(applicant) {
        console.log(applicant);
        let self = this;
        axios.post(Globals.serviceUrl+'application/save', applicant)
            .then(function (response) {
                self.setState({applicationCompleted:true});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
                self.setState({applicationCompleted:false});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();

        this.setState({isSubmitDisabled: true});
        const applicant = {
            name: this.state.name,
            surname: this.state.surname,
            phone: this.state.phone,
            about:this.state.about

        };
        this.saveApplicant(applicant);
    }


    render() {

        const {applicationCompleted} = this.state;
        const {errors} = this.state;
        const show = {display: "inline"}
        document.body.className = 'registerBody';


        return (
            <div className="full-width registerContainerMobile">
                <h6 className={"color-white"}>Activuss'a Katıl!</h6>

                {applicationCompleted && (
                    <div className={"registerCompletedMessage"}>
                        <h6>We have received your application!</h6>
                        <span>Your application is in our list. We will let you know when you application is approved via SMS. This can take weeks.</span><br/>
                        <span>Thank You!</span>
                    </div>

                )}

                <form onSubmit={this.onSubmit} hidden={applicationCompleted}>
                    <div className="form-group">
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.name
                            })}
                            placeholder="İsim"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        {errors.name && (
                            <div className="color-white">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="form-group ">
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.surname
                            })}
                            placeholder="Soyisim"
                            name="surname"
                            value={this.state.surname}
                            onChange={this.onChange}
                        />
                        {errors.surname && (
                            <div className="color-white">
                                {errors.surname}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.phone
                            })}
                            placeholder="Phone Number"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.onChange}
                        />
                        <span className={"color-white"}>Application result will be sent</span>
                        {errors.phone && (
                            <div className="color-white">
                                {errors.phone}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.about
                            })}
                            placeholder="A couple word about you, you lifestyle, hobbies etc."
                            name="about"
                            value={this.state.about}
                            onChange={this.onChange}
                        />
                        {errors.about && (
                            <div className="color-white">
                                {errors.about}
                            </div>
                        )}
                    </div>

                    <input
                        type="submit"
                        value="Apply"
                        className="btn btn-success btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    />
                </form>
                <br/>
                <a href={"/"} className={"color-white"}>Home</a> <span className={"color-white"}>|</span> <a
                href={"/login"} className={"color-white"}>Login</a>

            </div>

        );
    }
}


export default ApplicationForm;