import React from "react";
import classnames from "classnames";
import security from "../../../security/Security";
import Validator from "../../../util/Validator";
import InputMask from "react-input-mask";
import Alert from "../../common/Alert";
import Select from 'react-select'
import CityUtil from "../../../util/CityUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            name: "",
            surname: "",
            bDateString: "",
            phone: "",
            gender: "UNSELECTED",
            referenceCode: "",
            savedMessage: "",
            about: "",
            motivation: "",
            city: {},
            cities: [],
            errors: {},
            balance:"x"
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.fillFields();
    }

    fillFields() {
        console.log(this.props);
        let self = this;

        axios.get(Globals.serviceUrl+'user/myProfile/', security.authHeader())
            .then(function (response) {
                self.setState(response.data);
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
        this.initCities();
    }

    initCities() {


        let self = this;
        axios.get(Globals.serviceUrl+'city/all/', security.authHeader())
            .then(function (response) {
                let result = CityUtil.setCitiesForSelect(response.data);
                self.setState({cities: result.cities});
                self.setState({city: result.selectedCity});
            })
            .catch(function (error) {
            });
    }

    updateUser(newUser) {
        let self = this;
        axios.post(Globals.serviceUrl+'user/updateInfo', newUser, security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Bilgilerin Güncellendi"});
                localStorage.setItem("cityId", response.data.cityId);
                self.initCities();
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({"savedMessage": false});
                console.log(error.response);
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectChange(e) {
        this.setState({city: e});
    }

    onSubmit(e) {
        e.preventDefault();


        const newUser = {
            id: localStorage.getItem("userId"),
            name: this.state.name,
            surname: this.state.surname,
            phone: this.state.phone,
            bDateString: this.state.bDateString,
            gender: this.state.gender,
            referenceCode: this.state.referenceCode,
            about: this.state.about,
            cityId: this.state.city.value,
            motivation: this.state.motivation,
            balance:this.state.balance
        };
        this.updateUser(newUser);
    }


    render() {
        const {errors} = this.state;
        const {savedMessage} = this.state;
        const show = {display: "inline"};

        return (
            <div className="full-width container">
                <h4 className=" text-center">Bilgilerimi Düzenle</h4>
                <hr/>
                {savedMessage && (
                    <Alert type="alert-success" message={savedMessage}/>
                )}

                <form onSubmit={this.onSubmit}>
                    <div className="form-group text-align-left">
                        İsim*
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
                    <div className="form-group  text-align-left">
                        Soyisim*
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

                    <div className="form-group  text-align-left">
                        Telefon*
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
                            disabled={true}
                        />
                        {errors.phone && (
                            <div className="invalid-feedback">
                                {errors.phone}
                            </div>
                        )}
                    </div>
                    <div className="form-group  text-align-left">
                        Doğum Tarihi
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
                    <div className="form-group  text-align-left breakLine">
                        Kendinden Bahset
                        <textarea
                            className={classnames("form-control form-control-lg")}
                            placeholder="Kısaca Kendinden Bahset..."
                            name="about"
                            value={this.state.about}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group  text-align-left textareaBreakLine">
                        Bize film,kitap,şarkı önerir misin?
                        <textarea
                            className={classnames("form-control form-control-lg")}
                            placeholder="Godfather, Suç ve Ceza, Hotel California..."
                            name="motivation"
                            value={this.state.motivation}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group  text-align-left">
                        Yaşadığın Şehir
                        <Select value={this.state.city} options={this.state.cities} onChange={this.onSelectChange}/>
                        <div></div>
                        {errors.cityId && (
                            <div>
                                {errors.cityId && (errors.cityId)}
                            </div>

                        )}
                    </div>


                    <div className="form-group">
                        Do you think gender balance is important in events?<br/>
                        <label>Yes&nbsp;</label>
                        <input type="radio"
                               name="balance"
                               value="YES"
                               className={"customRadio"}
                               onChange={this.onChange}
                               checked={this.state.balance === "YES"}

                        />&nbsp;&nbsp;&nbsp;&nbsp;

                        <label>No&nbsp;</label>
                        <input type="radio"
                               name="balance"
                               className={"customRadio"}
                               onChange={this.onChange}
                               value="NO"
                               checked={this.state.balance === "NO"}

                        />
                        <br/>
                        <div className="invalid-feedback">
                            {errors.gender && (errors.gender)}
                        </div>

                    </div>
                    <hr/>
                    <div className="form-group">
                        Your Gender<br/>
                        <label>Erkek&nbsp;</label>
                        <input type="radio"
                               name="gender"
                               value="MALE"
                               className={"customRadio"}
                               onChange={this.onChange}
                               checked={this.state.gender === "MALE"}
                               disabled={true}

                        />&nbsp;&nbsp;&nbsp;&nbsp;

                        <label>Kadın&nbsp;</label>
                        <input type="radio"
                               name="gender"
                               className={classnames("customRadio", {
                                   "is-invalid": errors.gender
                               })}
                               onChange={this.onChange}
                               value="FEMALE"
                               checked={this.state.gender === "FEMALE"}
                               disabled={true}

                        />
                        <br/>
                        <div className="invalid-feedback">
                            {errors.gender && (errors.gender)}
                        </div>

                    </div>


                    {/*<div className="form-group  text-align-left">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        className={classnames("form-control form-control-lg", {*/}
                    {/*            "is-invalid": errors.referenceCode*/}
                    {/*        })}*/}
                    {/*        placeholder="Referans Kodu"*/}
                    {/*        name="referenceCode"*/}
                    {/*        value={"Referans Kodu : " + this.state.referenceCode}*/}
                    {/*        onChange={this.onChange}*/}
                    {/*        disabled*/}
                    {/*    />*/}
                    {/*    {errors.referenceCode && (*/}
                    {/*        <div className="invalid-feedback">*/}
                    {/*            {errors.referenceCode}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    {savedMessage && (
                        <Alert type="alert-success" message={savedMessage}/>
                    )}

                    <input
                        type="submit" value={"Güncelle"}
                        className="btn btn-primary btn-block mt-4"
                    />
                    <br/><br/>
                </form>
            </div>

        )
    }
}

export default UpdateInfo;