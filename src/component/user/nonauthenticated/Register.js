import React from "react";
import classnames from "classnames";
import Validator from "../../../util/Validator";
import InputMask from "react-input-mask";
import Alert from "../../common/Alert";

const axios = require('axios');


class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            surname: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            gender: "UNSELECTED",
            referenceCode: "",
            isSubmitDisabled:false,
            registrationCompletedMessage: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createUser(newUser) {
        console.log(newUser);
        let self = this;
        axios.post('http://localhost:8080/user/register', newUser)
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"registrationCompletedMessage": "Mailinize aktivasyon linki gönderilmiştir, linke tıklayarak hesabınızı aktifleştirebilirsiniz"});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled:false});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        let phoneValidationResult = Validator.validatePhoneNumber(this.state.phone);

        if (!phoneValidationResult.valid) {
            let errorUpdated = {...this.state.errors}
            errorUpdated.phone = "Telefon numarası uygun formatta değil";
            this.setState({"errors": errorUpdated})
            return;
        }
        this.setState({isSubmitDisabled:true});
        const newUser = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            phone: phoneValidationResult.phoneNumer,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            gender: this.state.gender,
            referenceCode: this.state.referenceCode,

        };
        this.createUser(newUser);
    }


    render() {

        const {registrationCompletedMessage} = this.state;
        const {errors} = this.state;
        const show = {display: "inline"}
        return (
            <div className="row">
                <div className={"col-md-6 offset-3"}>
                    <h4>Nigh Out'a Katıl!</h4>

                    {registrationCompletedMessage && (
                        <Alert type="alert-success" message={registrationCompletedMessage}/>

                        )}
                    <form onSubmit={this.onSubmit}>
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
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
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
                                <div className="invalid-feedback">
                                    {errors.surname}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.email
                                })}
                                placeholder="E-Posta"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <InputMask
                                type="text"
                                mask="0599 999 9999"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.phone
                                })}
                                placeholder="Telefon"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.onChange}
                            />
                            {errors.phone && (
                                <div className="invalid-feedback">
                                    {errors.phone}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.password
                                })}
                                placeholder="Şifre"
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
                                    "is-invalid": errors.confirmPassword
                                })}
                                placeholder="Şifre Tekrar"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="customRadioLabel">Erkek&nbsp;</label>
                            <input type="radio"
                                   name="gender"
                                   value="MALE"
                                   onChange={this.onChange}
                                   className="customRadio"
                            />&nbsp;&nbsp;&nbsp;&nbsp;
                            <label className="customRadioLabel">Kadın&nbsp;</label>
                            <input type="radio"
                                   name="gender"
                                   onChange={this.onChange}
                                   value="FEMALE"
                                   className="customRadio"
                            />
                            <br/>
                            <div className="invalid-feedback" style={show}>
                                {errors.gender}
                            </div>

                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.referenceCode
                                })}
                                placeholder="Referans Kodu"
                                name="referenceCode"
                                value={this.state.referenceCode}
                                onChange={this.onChange}
                            />
                            {errors.referenceCode && (
                                <div className="invalid-feedback">
                                    {errors.referenceCode}
                                </div>
                            )}
                        </div>

                        <input
                            type="submit"
                            value="Hesap Oluştur"
                            className="btn btn-primary btn-block mt-4"
                            disabled={this.state.isSubmitDisabled}
                        />
                    </form>
                    <br/>
                </div>
            </div>

        );
    }
}


export default Register;