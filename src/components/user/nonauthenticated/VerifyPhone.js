import React, {Component} from "react";
import classnames from "classnames";
import security from "../../../security/Security";
import Alert from "../../common/Alert";
import Globals from "../../../util/Globals";
import DownloadAppLink from "../../common/DownloadAppLink";

const axios = require('axios');

class VerifyPhone extends Component {
    constructor() {
        super();

        if (localStorage.getItem("jwtToken")) {
            security.logout();
        }
        this.state = {
            code: "",
            isSubmitDisabled: false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    verify(code) {
        const self = this;

        axios.get(Globals.serviceUrl + "user/verifyMobile/"+code)
            .then(function (res) {
                alert("Kaydınız tamamlandı, kullanıcı adı ve şifre ile giriş yapabilirsiniz");
                window.location="/login"
            }).catch(function (error) {
            self.setState({isSubmitDisabled: false});
            alert("Kodu yanlış girdiniz, tekra deneyin");
        });
    };

    onSubmit(e) {
        e.preventDefault();
        this.setState({isSubmitDisabled: true});

        this.verify(this.state.code);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="loginOuterMobile">
                <div className="loginContainerMobile">
                    <h6 className=" text-center">Telefonuna bir kod gönderdik</h6>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="Doğrulama Kodu"
                                name="code"
                                value={this.state.code}
                                onChange={this.onChange}
                            />
                        </div>
                        <input type="submit" value="Kaydı Tamamla"
                               className="btn btn-info btn-block mt-4"
                               disabled={this.state.isSubmitDisabled}/>
                    </form>
                    <br/>
                    <br/>
                    <span>
                    Eğer kodu almakta sorun yaşıyorsan instagramdan (activityfriend) bize yaz. Çözeriz:)
                    </span>
                    <div className={"bottom"}>
                        <DownloadAppLink/>
                    </div>
                </div>
            </div>

        );
    }
}

export default VerifyPhone;
