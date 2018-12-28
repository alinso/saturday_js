import React from "react";
import classnames from "classnames";
import security from "../../security/Security";

const axios = require('axios');


class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            newPassword: "",
            newPasswordConfirm: "",
            oldPassword: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.fillFields();
    }

    fillFields() {
        console.log(this.props);
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get('http://localhost:8080/user/id/' + userId, security.authHeader())
            .then(function (response) {
                console.log(response);
                self.setState(response.data);
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }

    UpdatePassword(changePasswordDto) {
        let self = this;


        axios.post('http://localhost:8080/user/updatePassword', changePasswordDto, security.authHeader())
            .then(function (response) {
                console.log(response);
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newPassword = {
            newPassword: this.state.newPassword,
            oldPassword: this.state.oldPassword,
            newPasswordConfirm: this.state.newPasswordConfirm
        }
        this.UpdatePassword(newPassword);
    }


    render() {
        const {errors} = this.state;


        return (
            <div>
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Hakkımda</h5>
                        <hr/>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.oldPassword
                                    })}
                                    placeholder="Mevcut Şifre"
                                    name="oldPassword"
                                    value={this.state.oldPassword}
                                    onChange={this.onChange}
                                />
                                {errors.oldPassword && (
                                    <div className="invalid-feedback">
                                        {errors.oldPassword}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.newPassword
                                    })}
                                    placeholder="Yeni Şifre"
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    onChange={this.onChange}
                                />
                                {errors.newPassword && (
                                    <div className="invalid-feedback">
                                        {errors.newPassword}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.newPasswordConfirm
                                    })}
                                    placeholder="Yeni Şifre Tekrar"
                                    name="newPasswordConfirm"
                                    value={this.state.newPasswordConfirm}
                                    onChange={this.onChange}
                                />
                                {errors.newPasswordConfirm && (
                                    <div className="invalid-feedback">
                                        {errors.newPasswordConfirm}
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

export default UpdatePassword;