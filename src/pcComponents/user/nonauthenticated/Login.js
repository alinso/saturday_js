import React, {Component} from "react";
import classnames from "classnames";
import security from "../../../security/Security";
import Alert from "../../common/Alert";
import Globals from "../../../util/Globals";

const axios = require('axios');

class Login extends Component {
    constructor() {
        super();

        if(localStorage.getItem("jwtToken")){
            security.logout();
        }
        this.state = {
            username: "",
            password: "",
            isSubmitDisabled:false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    login(LoginRequest) {
        const self = this;
        try {

            // post => LoginMobile Request
            axios.post(Globals.serviceUrl+"user/login", LoginRequest)
                .then(function (res) {
                    console.log("dd")

                    const {token} = res.data;
                    const {profilePicName} = res.data;
                    const {cityId} = res.data;
                    security.setLoginCredentials(token, profilePicName,cityId);
                    window.location = "/";
                }).catch(function (error) {
                console.log(error.response.data);
                self.setState({isSubmitDisabled:false});
                self.setState({"errors": error.response.data});
            });
        } catch (err) {

        }
    };


    onSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitDisabled:true});
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };
        this.login(LoginRequest);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="loginOuter">
                <div className="col-md-4 offset-md-4 loginContainer">
                    <h4 className=" text-center color-white">Giriş Yap</h4>
                    {errors.errorMessage && (
                        <Alert type="alert-danger" message={errors.errorMessage}/>

                        )}
                    {errors.userWarningMessage && (
                        <Alert type="alert-danger" message={errors.userWarningMessage}/>
                    )}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.errorMessage
                                })}
                                placeholder="E-Posta Adresi"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.errorMessage
                                })}
                                placeholder="Şifre"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />

                        </div>
                        <button type="submit"
                               className="btn btn-info btn-block mt-4"
                                disabled={this.state.isSubmitDisabled}>
                            <i className="fas fa-sync-alt fa-spin" hidden={!this.state.isSubmitDisabled}></i> Giriş Yap
                        </button>
                    </form>
                    <br/>
                    <a href="/forgottenPassword">Şifremi Unuttum</a>
                </div>
            </div>

        );
    }
}

export default Login;
