import React from "react";
import Globals from "../../util/Globals";
import Alert from "../common/AlertMobile";
import Security from "../../security/Security";
import JSUtil from "../../util/JSUtil";

const axios = require('axios');


class PremiumFormMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        this.state = {
            duration: "THREE_MONTHS",
            message: false,
            isSubmitDisabled:true,
            latestPremiumDate:null,
            profileDto:{},
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.buttonToggle = this.buttonToggle.bind(this);

        this.fillPage();
    }
    fillPage(){
        let self  =this;

        axios.get(Globals.serviceUrl + 'user/profile/'+localStorage.getItem("userId"), Security.authHeader())
            .then(function (response) {
                self.setState({profileDto: response.data});
            });

        axios.get(Globals.serviceUrl + 'premium/latestPremiumDate/', Security.authHeader())
            .then(function (response) {
                self.setState({latestPremiumDate: response.data});
            });
    }


    copyIban(){;
        JSUtil.selectText("iban");
        document.execCommand("copy");
        alert("iban kopyalandı");
    }
    buyPremium(premium) {
        let self = this;
        axios.post(Globals.serviceUrl + 'premium/save/', premium, Security.authHeader())
            .then(function (response) {
                self.setState({message: "Teşekkür ederiz, premium üyeliğiniz aktifleştirilmiştir"});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    buttonToggle(e) {
        if (this.state.isSubmitDisabled)
            this.setState({isSubmitDisabled: false});


        if (!this.state.isSubmitDisabled)
            this.setState({isSubmitDisabled: true});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const premium = {
            duration: this.state.duration
        };
        this.buyPremium(premium);
    }


    render() {


        return (
            <div className="full-width container">

                {(this.state.profileDto.userPremium) && (
                    <Alert type="alert-success" message={"Zaten premium üyesiniz, bir sonraki aldığınız paket var olan paket üzerine eklenecektir." +
                    " Şu an premium bitiş tarihiniz :" +this.state.latestPremiumDate}/>

                )}
                <h4>Premium Ol, Fark Yarat!</h4>
                <hr/>
                <h6>Her Ay Çekiliş ve Sürpriz Aktiviteler!</h6>

                <div className={"col-md-6 m-auto text-align-left"}>
                    <div className={"paymentIcons col-md-12 m-auto"}>
                        <i className="fas fa-glass-cheers"/>&nbsp;
                        <i className="fas fa-swimmer"/>&nbsp;
                        <i className="fas fa-bowling-ball"/>&nbsp;
                        <i className="fas fa-bicycle"/>&nbsp;
                        <i className="fas fa-award"/>&nbsp;
                        <i className="fab fa-fly"/>&nbsp;
                        <i className="fas fa-grin-stars"/>&nbsp;
                    </div>
                </div>
                <hr/>

                <div className={"col-md-6 m-auto text-align-left"}>
                    <i className="fas fa-check"/> Onaylı Profil<br/>
                    <i className="fas fa-check"/> Sınırsız İstek Gönderme<br/>
                    <i className="fas fa-check"/> Sınırsız Aktivite Açma<br/>
                </div>


                <hr/>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <input type="radio"
                               name="duration"
                               value="ONE_MONTH"
                               onChange={this.onChange}
                               className="customRadio"
                        />&nbsp;<label className="customRadioLabel">1 Ay (₺14,90)&nbsp;</label>
                       <br/>
                        <input type="radio"
                               name="duration"
                               onChange={this.onChange}
                               value="THREE_MONTHS"
                               className="customRadio"
                               checked={true}
                        />&nbsp;
                        <label className="customRadioLabel">3 Ay (₺39,90)&nbsp;</label>
                       <br/>
                        <input type="radio"
                               name="duration"
                               onChange={this.onChange}
                               value="SIX_MONTHS"
                               className="customRadio"
                        />&nbsp;
                        <label className="customRadioLabel">6 Ay (₺69,90)&nbsp;</label>
                        <br/>

                    </div>
                    <span className={"premiumWarning"}>Kredi Kartı ile ödeme sistemimiz henüz açılmadı. Şimdilik sadece havale alabilliyoruz.
                            Havale sonrası aşağıdaki butonu tıklayarak anında premium olabilirsiniz.
                            Sözünüze güveniyor ve havale gönderimini kontrol etmeden üyeliğinizi aktifleştiriyoruz.(Kötüye kullanım -30 puan)
                       </span>
                    <br/><hr/>
                    <div className={"col-md-12 text-align-left"}>
                        Havale (IBAN) Bilgileri:<br/>
                         <span id={"iban"}>TR160006400000142760517045</span>
                        <button type={"button"} onClick={this.copyIban} className={"btn btn-primary copyIbanButtonMobile"}>kopyala</button>
                        <br/>
                        İş Bankası, Ali İnsan Soyaslan
                    </div>
                    <div className={"col-md-12 havaleCode text-align-left"}>
                        <strong>Havale Açıklaması
                            : {this.state.duration.substring(0, 1) + "-" + localStorage.getItem("userId")}</strong>
                    </div>
                    <hr/>
                    {this.state.message && (
                        <Alert type="alert-success" message={this.state.message}/>

                    )}
                    <input onClick={this.buttonToggle} type={"checkbox"} name="havale"/> Havaleyi yaptım, premium
                    üyeliğimi aktifleştir.
                    <button
                        type="submit"
                        className="btn btn-success btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    >
                        <i className="fas fa-crown"/> <strong>Premium Ol</strong>
                    </button>
                    <span className={"premiumWarning"}> Ayrıca eğer 5 kişiye referans olursanız 1 ay premium üyelik hediyemiz.<br/>
                            Detaylı Bilgi : mail@activityfriend.net, whatsapp:0553 591 9925</span>
                </form>

                <br/>
            </div>
        )
    }
}

export default PremiumFormMobile;