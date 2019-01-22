import React from "react";
import classnames from "classnames";
import security from "../../../security/Security";
import AlertMobile from "../../common/AlertMobile";
import BackToProfileMobile from "../../common/BackToProfileMobile";
import Globals from "../../../util/Globals";

const axios = require('axios');


class UpdatePasswordMobile extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            newPassword: "",
            newPasswordConfirm: "",
            oldPassword: "",
            passwordUpdatedMessage: false,
            isSubmitDisabled: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    UpdatePassword(changePasswordDto) {
        let self = this;


        axios.post(Globals.serviceUrl+'user/updatePassword', changePasswordDto, security.authHeader())
            .then(function (response) {
                console.log(response);
                self.setState({"passwordUpdatedMessage": "Şifreniz Güncellendi"});
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
                self.setState({"passwordUpdatedMessage": false});
                self.setState({isSubmitDisabled: false});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitDisabled: true});
        const newPassword = {
            newPassword: this.state.newPassword,
            oldPassword: this.state.oldPassword,
            newPasswordConfirm: this.state.newPasswordConfirm
        }
        this.UpdatePassword(newPassword);
    }


    render() {
        const {errors} = this.state;
        const {passwordUpdatedMessage} = this.state;


        return (
            <div className="full-width container">
                <BackToProfileMobile/>

                <h5 className="text-center">Şifre Güncelle</h5>
                <hr/>
                {passwordUpdatedMessage && (
                    <AlertMobile type="alert-success" message={passwordUpdatedMessage}/>

                )}
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
                        value={"Şifremi Güncelle"}
                        className="btn btn-primary btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    /><br/>
                </form>
            </div>

        )
    }
}

export default UpdatePasswordMobile;