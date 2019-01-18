import React from "react";
import classnames from "classnames";
import AlertMobile from '../../common/AlertMobile';

const axios = require('axios');


class ForgottenPasswordMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: "",
            mailSentMessage: false,
            iSubmitDisabled: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    sendResetPasswordLinkMail(mail) {
        let self = this;

        axios.get('http://localhost:8080/user/forgottenPassword/' + mail)
            .then(function (response) {
                console.log(response);
                self.setState({"mailSentMessage": "Şifre Güncelleme Linki Gönderildi"});
                self.setState({isSubmitDisabled: false});
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
                self.setState({"mailSentMessage": false});
            });
    }


    onChange(e) {
        this.setState({"mail": e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitDisabled: true});
        this.sendResetPasswordLinkMail(this.state.mail);
    }


    render() {
        const {errors} = this.state;
        const {mailSentMessage} = this.state;


        return (
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">
                    <h5 className="display-4 text-center">Şifremi Unuttum</h5>
                    <hr/>
                    {mailSentMessage && (
                        <AlertMobile type="alert-success" message={mailSentMessage}/>
                    )}
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label for="mail">Şifrenizi yenilemek için E-Posta adresinizi Giriniz</label>
                            <input
                                type="email"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.userWarningMessage
                                })}
                                placeholder="E-Posta"
                                name="mail"
                                value={this.state.mail}
                                onChange={this.onChange}
                                required
                            />
                            {errors.userWarningMessage && (
                                <div className="invalid-feedback">
                                    {errors.userWarningMessage}
                                </div>
                            )}
                        </div>
                        <input
                            type="submit"
                            value={"Şifre Sıfırlama Linki Gönder"}
                            className="btn btn-primary btn-block mt-4"
                            disabled={this.state.isSubmitDisabled}
                        />
                    </form>
                </div>
            </div>

        )
    }
}

export default ForgottenPasswordMobile;