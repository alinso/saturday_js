import React from "react";
import security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class VerifyMailMobile extends React.Component {
    constructor(props) {
        super(props);
        this.tryToken();
        this.state = {
            errors: {}
        }
    }

    tryToken() {

        console.log(this.props);
        const self = this;
        const token = this.props.match.params.token;


        axios.get(Globals.serviceUrl+'user/verifyMail/' + token)
            .then(function (response) {
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }


    render() {
        return (

            <div className={"row outer"}>
                <div className={"col-md-6 m-x-auto container"}>
                    {(this.state.errors.userWarningMessage == null)&&
                    (
                        <div>Mailin Onaylandı!<br/>
                            <a href="/login">
                                <button className="btn btn-success"><h3>Giriş Yapabilirsin :)</h3></button>
                            </a>
                        </div>
                    )
                    }
                    {(this.state.errors.userWarningMessage)&&
                    (
                        <div>
                          <h4>Geçersiz Link</h4>
                        </div>
                    )
                    }

                </div>
            </div>)
    }
}

export default VerifyMailMobile;