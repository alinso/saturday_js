import React, {Component} from "react";
import classnames from "classnames";
import security from "../../../security/Security";
import AlertMobile from "../../common/AlertMobile";

const axios = require('axios');

class LoginMobile extends Component {
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
            axios.post("http://localhost:8080/user/login", LoginRequest)
                .then(function (res) {
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
                <div className="loginContainer">
                    <h5 className=" text-center">Giriş Yap</h5>
                    {errors.errorMessage && (
                        <AlertMobile type="alert-danger" message={errors.errorMessage}/>

                        )}
                    {errors.userWarningMessage && (
                        <AlertMobile type="alert-danger" message={errors.userWarningMessage}/>
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
                        <input type="submit" value="Giriş Yap"
                               className="btn btn-info btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}/>
                    </form>
                    <br/>
                    <a href="/forgottenPassword">Şifremi Unuttum</a> | <a href="/register">Kaydol</a>
                </div>
            </div>

        );
    }
}

export default LoginMobile;
