import React from "react";
import Globals from "../../util/Globals";
import Alert from "../common/AlertMobile";
import Security from "../../security/Security";
import BackToProfileMobile from "../common/BackToProfileMobile";

const axios = require('axios');


class PremiumFormMobile extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        this.state = {
            duration: "THREE_MONTHS",
            message: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

                <BackToProfileMobile/>

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

                {this.state.message && (
                    <Alert type="alert-success" message={this.state.message}/>

                )}

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
                    [ödeme formu]
                    <button
                        type="submit"
                        className="btn btn-success btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    ><i className="fas fa-sync-alt fa-spin" hidden={!this.state.isSubmitDisabled}/>
                        <i className="fas fa-crown"/> <strong>Premium Ol</strong>
                    </button>
                </form>

                <br/>
            </div>
        )
    }
}

export default PremiumFormMobile;