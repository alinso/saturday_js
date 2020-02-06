import React from "react";
import classnames from "classnames";
import Validator from "../../../util/Validator";
import InputMask from "react-input-mask";
import AlertMobile from "../../common/AlertMobile";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class RegisterM extends React.Component {
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
                //self.setState({"errors": {}});
                // self.setState({"registrationCompletedMessage": "Mailine aktivasyon linki gönderdik (bu bazen birkaç dakika sürebilir veya spama düşebilir) linke tıklayarak hesabını aktifleştirebilirsin."});
                // self.setState({"registrationCompleted": true});
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
                <h4 className={"color-white"}>Activuss'a Katıl!</h4>
                <br/>
                <h6 className={"color-white"}>
                    Üye olmak için isim,soyisim,telefon,email bilgilerini instagramdan (activityfriend) dm atabilirsin.
                    Teknik bir sıkıntıdan dolayı attığınız kayıtları geçiçi olarak bu şekilde alıyoruz (Anlayışla karşılaycağını umuyoruz)
                    Ve merak etme süreç çok hızlı işliyor:)</h6>

                <a href={"/"} className={"color-white"}>Anasayfa</a> <span className={"color-white"}>|</span> <a
                href={"/login"} className={"color-white"}>Giriş Yap</a>

            </div>

        );
    }
}


export default RegisterM;