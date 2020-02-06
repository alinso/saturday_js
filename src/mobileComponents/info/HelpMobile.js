import React from "react";
import Alert from "../../pcComponents/common/Alert";
import Globals from "../../util/Globals";
import Security from "../../security/Security";
const axios = require('axios');


class HelpMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        this.state = {
            duration: null,
            message: false,
            errors: {},
            isSubmitDisabled: false,
            latestPremiumDate:null,
            profileDto: {},
            id:null
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.buttonToggle = this.buttonToggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.buyPremium=this.buyPremium.bind(this);

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
        this.buyPremium();
    }
    buyPremium() {
        let self = this;


        let result=window.confirm("Seçtiğiniz premium üyeliği almak istiyor musunuz?");
        if(!result)
            return false;


        axios.get(Globals.serviceUrl + 'premium/sellMePremium/'+this.state.duration, Security.authHeader())
            .then(function (response) {
               alert("Teşekkür ederiz, premium üyeliğiniz aktifleştirilmiştir, bilgilendirme için mesaj gelecektir");
                self.buttonToggle();
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    render() {


        return (
            <div className="full-width text-align-left container">

                <br/>
                <strong> Sınıra takılma, öne geç!</strong>
                <hr/>
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



                Activus projesinin masraflarının karşılanması, daha da büyümesi ve gelişmesi için tek gelir kaynağı premium üyeliklerdir. Başka bir reklam veya sponsorluk gelirimiz malesef yok:(
                <br/><br/>
                Sen de sınırlara takılmak istemiyor, aktivitelerde öne çıkmak ve projemize destek olmak istiyorsan premium
                olabilirsin. Premium özellik ve fiyatları aşağıdaki şekildedir.
                <hr/>
                <strong><span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>SILVER onaylı
                    profil</strong>
                <br/>
                <span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>Hatfada 5 aktivite <br/>
                <span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>Günde 7 istek <br/>
                <span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>15 kişi onaylama <br/>
                (Aylık : 19.90 ₺/ 3 aylık : 49.90₺ ) <br/>



                <strong><span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>GOLD onaylı
                    profil</strong>
                <br/>

                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Haftada 10 aktivite <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Günde 20 istek <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>25 kişi onaylama <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Dolu aktiviteye istek
                gönderme <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Aktivitene sınırsız istek
                alabilme <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Aktiviteye istek atmadan önce katılımcıları görebilme<br/>

                (Aylık : 29.90₺ / 3 aylık : 79.90₺)
                <hr/>
                <form onSubmit={this.onSubmit}>

                    <h5>Silver</h5>
                    <div className="form-group">
                        <input type="radio"
                               name="duration"
                               value="SONE_MONTH"
                               onChange={this.onChange}
                               className="customRadio"
                        />&nbsp;<label className="customRadioLabel">1 Ay (₺19,90)&nbsp;</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio"
                               name="duration"
                               onChange={this.onChange}
                               value="STHREE_MONTHS"
                               className="customRadio"
                        />&nbsp;
                        <label className="customRadioLabel">3 Ay (₺49,90)&nbsp;</label>
                    </div>
                    <h5>Gold</h5>
                    <div className="form-group">
                        <input type="radio"
                               name="duration"
                               value="GONE_MONTH"
                               onChange={this.onChange}
                               className="customRadio"
                        />&nbsp;<label className="customRadioLabel">1 Ay (₺29,90)&nbsp;</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio"
                               name="duration"
                               onChange={this.onChange}
                               value="GTHREE_MONTHS"
                               className="customRadio"
                        />&nbsp;
                        <label className="customRadioLabel">3 Ay (₺79,90)&nbsp;</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;

                    </div>
                    {this.state.message && (
                        <Alert type="alert-success" message={this.state.message}/>

                    )}
                    <button
                        type="submit"
                        className="btn btn-success btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    >
                        <i className="fas fa-crown"/> <strong>Premium Ol!</strong>
                    </button>
                </form>
<br/><br/><br/>
            </div>


        )
    }
}

export default HelpMobile;