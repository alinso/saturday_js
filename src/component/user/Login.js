import React, {Component} from "react";
import classnames from "classnames";
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
        const self =this;
        try {
            // post => Login Request
            console.log("asd");
             axios.post("http://localhost:8080/user/login", LoginRequest)
                .then(function (res) {
                    const {token} = res.data;
                    localStorage.setItem("jwtToken", token);
                    self.setJWTToken(token);

                });
        } catch (err) {
           console.log(err);
        }
    };


    setJWTToken(token) {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        } else {
            delete axios.defaults.headers.common["Authorization"];
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
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
