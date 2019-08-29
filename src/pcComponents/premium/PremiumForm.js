import React from "react";
import Globals from "../../util/Globals";
import Alert from "../common/Alert";
import Security from "../../security/Security";
import JSUtil from "../../util/JSUtil";
import classnames from "classnames";

const axios = require('axios');


class PremiumForm extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();
        this.state = {
            duration: null,
            message: false,
            errors: {},
            isSubmitDisabled: true,
            latestPremiumDate:null,
            profileDto: {},
            id:null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.buttonToggle = this.buttonToggle.bind(this);
        this.getInfo=this.getInfo.bind(this);
    }

    getInfo() {
        let self = this;
        axios.get(Globals.serviceUrl + Globals.adminUrl + 'userInfo/' + this.state.id, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Bilgiler Alındı"});
                self.setState({"userdata": response.data});
                self.setState({"extraPoint": response.data.extraPoint});
                self.setState({isSubmitDisabled: false});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    buyPremium(premium) {
        let self = this;
        axios.post(Globals.serviceUrl + 'premium/save/'+this.state.id, premium, Security.authHeader())
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

    copyIban(){;
        JSUtil.selectText("iban");
        document.execCommand("copy");
        alert("iban kopyalandı");
    }
    buttonToggle(e) {
        if (this.state.isSubmitDisabled)
            this.setState({isSubmitDisabled: false});


        if (!this.state.isSubmitDisabled)
            this.setState({isSubmitDisabled: true});
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
            <div className="row outer">
                <div className="col-md-8 m-x-auto container">

                    <div className={"row"}>
                        <div className={"col-md-8 m-auto text-align-center"}>


                        <div className={"col-md-12 m-auto text-align-left"}>
                            <i className="fas fa-check"/> Onaylı Profil<br/>
                            <i className="fas fa-check"/> Haftada 5 Aktivite<br/>
                            <i className="fas fa-check"/> Günde 10 istek<br/>
                            <i className="fas fa-check"/> 15 kişi onaylayabilme<br/>
                        </div>
                            <hr/>
                        <div className={"col-md-12 m-auto text-align-left"}>
                            <i className="fas fa-check"/> Onaylı Profil<br/>
                            <i className="fas fa-check"/> Haftada 10 Aktivite<br/>
                            <i className="fas fa-check"/> Günde 20 istek<br/>
                            <i className="fas fa-check"/> 25 kişi onaylayabilme<br/>
                            <i className="fas fa-check"/> Dolu aktivitelere istek atabilme<br/>
                            <i className="fas fa-check"/> Sınırsız istek alabilme(Aktivite hiçbir zaman dolu gözükmez)<br/>
                        </div>
                    </div>
                    <hr/>
                    <div className={"col-md-10 m-x-auto"}>
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg")}
                            placeholder="Kullanıcı Id"
                            name="id"
                            value={this.state.id}
                            onChange={this.onChange}
                        />

                    <button
                        type="button"
                        className="btn btn-primary btn-block mt-4"
                        onClick={this.getInfo}>Bilgileri Getir</button>
                        {this.state.userdata && (
                            <div>
                                {this.state.userdata.name} {this.state.userdata.surname}
                                <br/>
                                {this.state.userdata.phone}
                                <br/>
                                {this.state.userdata.email}
                            </div>)
                        }
                        <br/>
                        <hr/>
                    </div>
                    <form onSubmit={this.onSubmit}>

                        <h3>Silver</h3>
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
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio"
                                   name="duration"
                                   onChange={this.onChange}
                                   value="SSIX_MONTHS"
                                   className="customRadio"
                            />&nbsp;
                            <label className="customRadioLabel">6 Ay (₺89,90)&nbsp;</label>
                            <br/>
                        </div>
                        <h3>Gold</h3>
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
                        <input type="radio"
                               name="duration"
                               onChange={this.onChange}
                               value="GSIX_MONTHS"
                               className="customRadio"
                        />&nbsp;
                        <label className="customRadioLabel">6 Ay (₺139,90)&nbsp;</label>
                        <br/>
                        </div>
                        <br/><hr/>

                        {this.state.message && (
                            <Alert type="alert-success" message={this.state.message}/>

                        )}
                        <button
                            type="submit"
                            className="btn btn-success btn-block mt-4"
                            disabled={this.state.isSubmitDisabled}
                        >
                            <i className="fas fa-crown"/> <strong>Premium Yap</strong>
                        </button>
                    </form>

                    <br/>
                </div>
                </div></div>
        )
    }
}

export default PremiumForm;