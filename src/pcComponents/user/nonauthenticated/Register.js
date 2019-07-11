
import React from "react";
import classnames from "classnames";
import Validator from "../../../util/Validator";
import InputMask from "react-input-mask";
import Alert from "../../common/Alert";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class Register extends React.Component {
    constructor() {
        super();

        if(localStorage.getItem("jwtToken")){
            Security.logout();
        }

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
            userGuide:false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleCheckBox= this.toggleCheckBox.bind(this);
    }

    createUser(newUser) {
        console.log(newUser);
        let self = this;
        axios.post(Globals.serviceUrl+'user/register', newUser)
            .then(function (response) {
                self.setState({"errors": {}});
                // self.setState({"registrationCompletedMessage": "Mailine aktivasyon linki gönderdik (bu bazen birkaç dakika sürebilir veya spama düşebilir) linke tıklayarak hesabını aktifleştirebilirsin."});
                 //self.setState({"registrationCompletedMessage": "Kayıt tamamlandı, giriş sayfasından yapabilirsin"});
                window.location="/verifyPhone";

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled:false});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleCheckBox(){
        this.setState({"userGuide":!this.state.userGuide});
    }

    onSubmit(e) {
        e.preventDefault();

        if(!this.state.userGuide){
            alert("Kullanım koşullarını kabul etmelisiniz");
            return;
        }
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
            email: this.state.email.trim(),
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
            <div className="md-auto registerOuter">
                <div className={"col-md-4 offset-4 registerContainer"}>
                    <h4 className={"color-white"}>Activity Friend'e Katıl!</h4>
                    <h5 className={"color-white"}>Erkek alımlarımız sayısal nedenlerden dolayı geçiçi olarak kapalıdır</h5>

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
                                    "is-invalid": errors.email
                                })}
                                placeholder="E-Posta"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            {errors.email && (
                                <div className="color-white">
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
                                <div className="color-white">
                                    {errors.phone}
                                </div>
                            )}
                            <span className={"color-white"}>Doğrulama kodu gönderilecek</span>
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
                                <div className="color-white">
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
                                <div className="color-white">
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="customRadioLabel color-white">Erkek&nbsp;</label>
                            <input type="radio"
                                   name="gender"
                                   value="MALE"
                                   onChange={this.onChange}
                                   className="customRadio"
                            />&nbsp;&nbsp;&nbsp;&nbsp;
                            <label className="customRadioLabel color-white">Kadın&nbsp;</label>
                            <input type="radio"
                                   name="gender"
                                   onChange={this.onChange}
                                   value="FEMALE"
                                   className="customRadio"
                            />
                            <br/>
                            <div className="color-white" style={show}>
                                {errors.gender}
                            </div>

                        </div>

                        <input name={"userGuide"} onClick={this.toggleCheckBox} type={"checkbox"}/>
                        <label className={"color-white"} ><a className={"color-white"} href={"/userGuide"}>
                            <strong>Kullanım koşulları</strong></a>'nı ve <a  className={"color-white"}  href={"/privacyPolicy"}><strong>Gizlilik Politikası</strong></a>'nı
                            okudum ve kabul ediyorum.</label>

                        <button
                            type="submit"
                            className="btn btn-success btn-block mt-4"
                            disabled={this.state.isSubmitDisabled}
                        ><i className="fas fa-sync-alt fa-spin" hidden={!this.state.isSubmitDisabled}> </i> Hesap Oluştur</button>
                    </form>

                    <br/>
                </div>
            </div>

        );
    }
}


export default Register;