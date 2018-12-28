import React, {Component} from "react";
import classnames from "classnames";
import security from "../../security/Security";

const axios = require('axios');

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentDidMount() {
    //   if (this.props.security.validToken) {
    //     this.props.history.push("/dashboard");
    //   }
    // }
    //
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.security.validToken) {
    //     this.props.history.push("/dashboard");
    //   }
    //
    //   if (nextProps.errors) {
    //     this.setState({ errors: nextProps.errors });
    //   }
    //}
    login(LoginRequest) {
        const self = this;
        try {
            // post => Login Request
            axios.post("http://localhost:8080/user/login", LoginRequest)
                .then(function (res) {
                    const {token} = res.data;
                    const {userName} = res.data;
                    security.setLoginCredentials(token, userName);
                    window.location = "/dashboard";
                }).catch(function (error) {
                console.log(error);


                self.setState({"errors": error.response.data});
            });
        } catch (err) {
            console.log(err);
        }
    };


    onSubmit(e) {
        e.preventDefault();
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
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
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
                            {errors.errorMessage && (
                                <div className="invalid-feedback">{errors.errorMessage} </div>
                            )}
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                </div>
            </div>

        );
    }
}

export default Login;
