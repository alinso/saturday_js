import React from "react";
import classnames from "classnames";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class Register extends React.Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem("jwtToken")) {
            Security.logout();
        }

        this.state = {
            approvalCode: this.props.match.params.approvalCode,
            name: "",
            password: "",
            confirmPassword: "",
            gender: "UNSELECTED",
            isSubmitDisabled: false,
            registrationCompleted: false,
            userGuide: false,
            errors: {}
        };
        this.getName = this.getName.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.getName();
    }

    createUser(newUser) {
        console.log(newUser);
        let self = this;
        axios.post(Globals.serviceUrl + 'user/register', newUser)
            .then(function (response) {
                self.setState({registrationCompleted: true});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
            });
    }


    getName() {
        let self = this;
        axios.get(Globals.serviceUrl + 'user/getNameForRegistration/' + this.state.approvalCode)
            .then(function (response) {
                self.setState({name: response.data});
            })
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleCheckBox() {
        this.setState({"userGuide": !this.state.userGuide});
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.userGuide) {
            alert("Kullanım koşullarını kabul etmelisiniz");
            return;
        }

        this.setState({isSubmitDisabled: true});
        const newUser = {
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            gender: this.state.gender,
            approvalCode: this.state.approvalCode
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

                {registrationCompleted && (<div>
                        <h6 className={"color-white"}>Congratulations <strong>{this.state.name}</strong>!</h6>
                        <span className={"color-white"}>
                     Your application has been approved, please fill the form below to complete your registration<br/>
                </span></div>
                )}
                {registrationCompleted && (
                    <div className={"registerCompletedMessage"}>
                        <h6>Kayıt Tamamlandı</h6>
                        <span>Bize katıldığın için teşekkür ederiz. </span><br/>
                        <a className={"color-white"} href={"/login"}>
                            <btn className="btn btn-success">Giriş İçin Tıkla</btn>
                        </a>
                    </div>

                )}

                <form onSubmit={this.onSubmit} hidden={registrationCompleted}>


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


                    <div className={"userTermsMobile"}>
                        <input className={"float-left"} name={"userGuide"} onClick={this.toggleCheckBox}
                               type={"checkbox"}/>
                        <span className={"color-white"}><a className={"color-white"} href={"/userGuide"}>
                        <strong>Kullanım koşulları</strong></a>'nı ve <a className={"color-white"}
                                                                         href={"/privacyPolicy"}><strong>Gizlilik Politikası</strong></a>'nı
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


export default Register;