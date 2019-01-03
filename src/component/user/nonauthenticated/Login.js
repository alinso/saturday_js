import React, {Component} from "react";
import classnames from "classnames";
import security from "../../../security/Security";
import Alert from "../../common/Alert";

const axios = require('axios');

class Login extends Component {
    constructor() {
        super();
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
            // post => Login Request
            axios.post("http://localhost:8080/user/login", LoginRequest)
                .then(function (res) {
                    const {token} = res.data;
                    const {userName} = res.data;
                    security.setLoginCredentials(token, userName);
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
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h4 className=" text-center">Giriş Yap</h4>
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
                                placeholder="Email Address"
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
                                placeholder="Password"
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
                    <a href="/forgottenPassword">Şifremi Unuttum</a>
                </div>
            </div>

        );
    }
}

export default Login;
