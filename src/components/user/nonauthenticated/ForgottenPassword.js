import React from "react";
import classnames from "classnames";
import Globals from "../../../util/Globals";

const axios = require('axios');


class ForgottenPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:null
        };
        this.sendPass=this.sendPass.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }


    sendPass() {
        // post => Login Request
        axios.get(Globals.serviceUrl + "user/forgottenPassword/"+this.state.phone)
            .then(function (res) {
                alert("Birazdan yeni şifre telefonuna gelecek");
                window.location="/login";
            })
            .catch(function (e) {
                alert("Bu numaraya kayıtlı bir kullanıcı bulunamadı");
            });
    };

    onChange(e) {
        this.setState({"phone": e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitDisabled: true});
        this.sendPass(this.state.mail);
    }


    render() {
        const {errors} = this.state;


        return (
            <div className="full-width container">
                <h5 className="text-center">Şifremi Unuttum</h5>
                <hr/>

                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label for="phone">Şifrenizi yenilemek için telefon numaranı gir</label>
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg")}
                            placeholder="Telefon numarası"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.onChange}
                            required
                        />

                    </div>
                    <input
                        type="submit"
                        value={"Ateşle"}
                        className="btn btn-primary btn-block mt-4"
                        disabled={this.state.isSubmitDisabled}
                    />
                </form><br/>
                <a href="/login">Giriş Yap</a> | <a href="/register">Kaydol</a>
            </div>

        )
    }
}

export default ForgottenPassword;