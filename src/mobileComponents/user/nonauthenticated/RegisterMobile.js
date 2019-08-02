import React from "react";
import classnames from "classnames";
import Validator from "../../../util/Validator";
import InputMask from "react-input-mask";
import AlertMobile from "../../common/AlertMobile";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class RegisterMobile extends React.Component {
    constructor() {
        super();

        if (localStorage.getItem("jwtToken")) {
            Security.logout();
        }

        this.state = {
            name: "",
            surname: "",
            email: "",
            phone: null,
            password: "",
            confirmPassword: "",
            gender: "UNSELECTED",
            referenceCode: "",
            isSubmitDisabled: false,
            registrationCompleted: false,
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
                window.location="/verifyPhone";
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
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
        this.setState({isSubmitDisabled: true});
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

        const {registrationCompleted} = this.state;
        const {errors} = this.state;
        const show = {display: "inline"}
        document.body.className = 'registerBody';


        return (
            <div className="full-width registerContainerMobile">
                <h6 className={"color-white"}>Activity Friend'e Katıl!</h6>

                {registrationCompleted && (
                    <div className={"registerCompletedMessage"}>
                        <h6 >Kayıt Tamamlandı</h6>
                        <span>Bize katıldığın için teşekkür ederiz. </span><br/>
                        <a className={"color-white"} href={"/login"}><btn className="btn btn-success">Giriş İçin Tıkla</btn></a>
                    </div>

                )}

                <form onSubmit={this.onSubmit} hidden={registrationCompleted}>
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
                        <span className={"color-white"}>Doğrulama kodu gönderilecek</span>
                        {errors.phone && (
                            <div className="color-white">
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
                        <label className="customRadioLabelMobile color-white">Erkek&nbsp;</label>
                        <input type="radio"
                               name="gender"
                               value="MALE"
                               onChange={this.onChange}
                               className="customRadio"
                        />&nbsp;&nbsp;&nbsp;&nbsp;
                        <label className="customRadioLabelMobile color-white">Kadın&nbsp;</label>
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
                    { this.state.gender==="MALE" &&(
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control ", {
                                    "is-invalid": errors.referenceCode
                                })}
                                placeholder="Referans Kodu"
                                name="referenceCode"
                                value={this.state.referenceCode}
                                onChange={this.onChange}
                            />
                            {errors.referenceCode && (
                                <div className="color-white">
                                    {errors.referenceCode}
                                </div>
                            )}
                        </div>)
                    }
                    <div className={"userTermsMobile"}>
                    <input className={"float-left"} name={"userGuide"} onClick={this.toggleCheckBox} type={"checkbox"}/>
                        <span className={"color-white"} ><a className={"color-white"} href={"/userGuide"}>
                        <strong>Kullanım koşulları</strong></a>'nı ve <a  className={"color-white"}  href={"/privacyPolicy"}><strong>Gizlilik Politikası</strong></a>'nı
                        okudum ve kabul ediyorum.</span>
                    </div>
                    <input
                        type="submit"
                        value="Hesap Oluştur"
                        className="btn btn-success btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    />
                </form>
                <br/>
                <a href={"/"} className={"color-white"}>Anasayfa</a> <span className={"color-white"}>|</span> <a
                href={"/login"} className={"color-white"}>Giriş Yap</a>

            </div>

        );
    }
}


export default RegisterMobile;