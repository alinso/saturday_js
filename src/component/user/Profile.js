import React from "react";
import classnames from "classnames";
import security from "../../security/Security";

const axios = require('axios');


class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            name: "",
            surname: "",
            email: "",
            phone: "",
            gender: "UNSELECTED",
            referenceCode: "",
            profilePicUrl: "",
            about: "",
            motivation: "",
            errors: {},
            photos:{}
        };

        this.fillFields();
    }

    fillFields() {
        console.log(this.props);
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get('http://localhost:8080/user/id/' + userId, security.authHeader())
            .then(function (response) {
                console.log(response);
                self.setState(response.data);
                if(response.data.profilePicUrl==="")
                    self.setState({"profilePicUrl":"/user.png"});
                else
                    self.setState({"profilePicUrl":"/upload/profile/"+response.data.profilePicUrl})
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }


    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="col-md-4 m-auto">
                            <a href="/updateProfilePic/">
                        <img className="profilePic" src={this.state.profilePicUrl}/>
                            </a>
                        </div>
                        <h5 className="display-4 text-center">{this.state.name + " " + this.state.surname}</h5>
                        <hr/>
                        <a href="/settings/">Hesap Ayarları</a>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Hakkımda</h3>
                            </div>
                            <div className="panel-body">
                                {this.state.about}
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Neden Night Out?</h3>
                            </div>
                            <div className="panel-body">
                                {this.state.motivation}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default UpdateInfo;