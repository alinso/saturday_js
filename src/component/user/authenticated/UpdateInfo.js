import React from "react";
import classnames from "classnames";
import security from "../../../security/Security";
import Validator from "../../../util/Validator";
import InputMask from"react-input-mask";
import Alert from "../../common/Alert";

const axios = require('axios');


class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            name: "",
            surname: "",
            email: "",
            bDateString:"",
            phone: "",
            gender: "UNSELECTED",
            referenceCode: "",
            savedMessage: "",
            about: "",
            motivation: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.fillFields();
    }

    fillFields() {
        console.log(this.props);
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get('http://localhost:8080/user/myProfile/', security.authHeader())
            .then(function (response) {
                self.setState(response.data);
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    updateUser(newUser) {
        console.log("profile updated");
        console.log(newUser);
        let self = this;
        axios.post('http://localhost:8080/user/updateInfo', newUser, security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Bilgileriniz Güncellendi"});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({"savedMessage": false});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        let phoneValidationResult = Validator.validatePhoneNumber(this.state.phone);

        if(!phoneValidationResult.valid){
            let errorUpdated = {...this.state.errors}
            errorUpdated.phone = "Telefon numarası uygun formatta değil";
            this.setState({"errors":errorUpdated})
            return;
        }


        const newUser = {
            id: localStorage.getItem("userId"),
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            phone: phoneValidationResult.phoneNumer,
            bDateString: this.state.bDateString,
            gender: this.state.gender,
            referenceCode: this.state.referenceCode,
            about: this.state.about,
            motivation: this.state.motivation
        };
        this.updateUser(newUser);
    }


    render() {
        const {errors} = this.state;
        const {savedMessage} = this.state;
        const show = {display: "inline"}


        return (
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Bilgilerimi Düzenle</h5>
                    <hr/>
                    {savedMessage && (
                        <Alert type="alert-success" message={savedMessage}/>
                    )}

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.name
                                })}
                                placeholder="İsim"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            {errors.name && (
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.surname
                                })}
                                placeholder="Soyisim"
                                name="surname"
                                value={this.state.surname}
                                onChange={this.onChange}
                            />
                            {errors.surname && (
                                <div className="invalid-feedback">
                                    {errors.surname}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.email
                                })}
                                placeholder="E-Posta"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <InputMask
                                mask="0599 999 9999"
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.phone
                                })}
                                placeholder="Telefon"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.onChange}
                                required
                            />
                            {errors.phone && (
                                <div className="invalid-feedback">
                                    {errors.phone}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <InputMask
                                mask="99/99/9999"
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.bDateString
                                })}
                                placeholder="Doğum Tarihi(gün/ay/yil)"
                                name="bDateString"
                                value={this.state.bDateString}
                                onChange={this.onChange}
                            />
                            {errors.bDateString && (
                                <div className="invalid-feedback">
                                    {errors.bDateString}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg")}
                                            placeholder="Kısaca Kendinden Bahset..."
                                            name="about"
                                            value={this.state.about}
                                            onChange={this.onChange}
                                        />
                        </div>
                        <div className="form-group">
                                        <textarea
                                            className={classnames("form-control form-control-lg")}
                                            placeholder="Neden Burdasın..."
                                            name="motivation"
                                            value={this.state.motivation}
                                            onChange={this.onChange}
                                        />
                        </div>

                        <div className="form-group">
                            <label>Erkek&nbsp;</label>
                            <input type="radio"
                                   name="gender"
                                   value="MALE"
                                   onChange={this.onChange}
                                   checked={this.state.gender === "MALE"}
                            />&nbsp;&nbsp;&nbsp;&nbsp;

                            <label>Kadın&nbsp;</label>
                            <input type="radio"
                                   name="gender"
                                   onChange={this.onChange}
                                   value="FEMALE"
                                   checked={this.state.gender === "FEMALE"}
                            />
                            <br/>
                            <div className="invalid-feedback" style={show}>
                                {errors.gender}
                            </div>

                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.referenceCode
                                })}
                                placeholder="Referans Kodu"
                                name="referenceCode"
                                value={"Referans Kodu : "+this.state.referenceCode}
                                onChange={this.onChange}
                                disabled
                            />
                            {errors.referenceCode && (
                                <div className="invalid-feedback">
                                    {errors.referenceCode}
                                </div>
                            )}
                        </div>

                        <input
                            type="submit"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </form>

                </div>
            </div>

        )
    }
}

export default UpdateInfo;