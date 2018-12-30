import React from "react";
import classnames from "classnames";

const axios = require('axios');


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            passwordConfirm: "",
            passwordHasResetMessage:"",
            token: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    resetPassword(resetPasswordDto) {
        let self = this;

        axios.post('http://localhost:8080/user/resetPassword/' ,resetPasswordDto )
            .then(function (response) {
                console.log(response);
                self.setState({"passwordHasResetMessage": "Şifreniz Güncellendi"});
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
                self.setState({"passwordHasResetMessage": false});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const passwordDto = {
            token: this.props.match.params.token,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }

        this.resetPassword(passwordDto);
    }


    render() {
        const {errors} = this.state;
        const {passwordHasResetMessage} = this.state;


        return (
            <div>
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Şifremi Yenile</h5>
                        <hr/>
                        {passwordHasResetMessage && (
                            <h6>{passwordHasResetMessage}</h6>
                        )}
                        {errors.userWarningMessage && (
                            <div>
                                {errors.userWarningMessage}
                            </div>
                        )}
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.password
                                    })}
                                    placeholder="Yeni Şifrenizi Giriniz"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.passwordConfirm
                                    })}
                                    placeholder="Yeni Şifrenizi Tekrar Giriniz"
                                    name="passwordConfirm"
                                    value={this.state.passwordConfirm}
                                    onChange={this.onChange}
                                />
                                {errors.passwordConfirm && (
                                    <div className="invalid-feedback">
                                        {errors.passwordConfirm}
                                    </div>
                                )}
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary btn-block mt-4"
                            />

                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default ResetPassword;