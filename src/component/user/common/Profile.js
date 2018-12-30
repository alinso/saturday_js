import React from "react";
import security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";

const axios = require('axios');


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            gender: "UNSELECTED",
            profilePicUrl: "",
            about: "",
            age: "",
            motivation: "",
            errors: {}
        };

        this.fillFields();
    }

    fillFields() {
        console.log(this.props);
        let self = this;
        let userId = this.props.match.params.id;

        axios.get('http://localhost:8080/user/profile/' + userId, security.authHeader())
            .then(function (response) {
                self.setState(response.data);
                self.setState({"gender": UserUtil.translateGender(self.state.gender)});
                self.setState({"profilePicUrl": UserUtil.buildProfilePicUrl(response.data.profilePicName)});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });
    }


    render() {

        return (
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="row">
                        <div className="col-md-4">
                            <img className="profilePic" src={this.state.profilePicUrl}/>
                            <br/>
                            <br/>
                            <h3 className=" text-center">{this.state.name + " " + this.state.surname}</h3>
                            <h5>{this.state.gender} / {this.state.age}</h5>
                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i
                            className="fas fa-star"></i><i className="fas fa-star"></i><i
                            className="fas fa-star"></i>(37)
                        </div>

                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3">
                                    <a className="profileTitle" href={"/album/" + this.props.match.params.id}>
                                        Fotoğraflar(16)
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a className="profileTitle" href={"/album/" + this.props.match.params.id}>
                                        Arkadaşlar(11)
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a className="profileTitle" href={"/album/" + this.props.match.params.id}>
                                        Referanslar(12)
                                    </a>
                                </div>
                                <div className="col-md-3">
                                    <a className="profileTitle" href={"/album/" + this.props.match.params.id}>
                                        Buluşmalar(9)
                                    </a>
                                </div>
                            </div>
                            <br/><br/>
                            <div className="row">
                                <div className="card col-md-12">
                                    <div className="card-body">
                                        <span className="badge badge-pill badge-success my-interests">Kitap</span>
                                        <span className="badge badge-pill badge-success my-interests">Müzik</span>
                                        <span className="badge badge-pill badge-success my-interests">Sinemaya Gitmek</span>
                                        <span className="badge badge-pill badge-success my-interests">Film İzlemek</span>
                                        <span className="badge badge-pill badge-success my-interests">Sinemaya Gitmek</span>
                                        <span className="badge badge-pill badge-success my-interests">Film İzlemek</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Hakkımda</h5>
                                        <hr/>
                                        {this.state.about}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Neden Burdayım?</h5>
                                        <hr/>
                                        {this.state.motivation}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default Profile;