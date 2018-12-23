import React from "react";
import classnames from "classnames";
const axios = require('axios');


class UserRegister extends React.Component{
    constructor() {
        super();

        this.state = {
            name: "",
            surname: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            gender: {},
            referenceCode:"",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createUser(newUser){
        console.log("user cretade");
        console.log(newUser);
        axios.post('http://localhost:8080/user/register', newUser)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            gender: this.state.gender,
            referenceCode: this.state.referenceCode,

        };
        this.createUser(newUser);
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Kullanıcı Kayıt</h5>
                                <hr />
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
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.phone
                                            })}
                                            placeholder="Telefon"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.onChange}
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">
                                                {errors.phone}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.password
                                            })}
                                            placeholder="Şifre"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.confirmPassword
                                            })}
                                            placeholder="Şifre Tekrar"
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.onChange}
                                        />
                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback">
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Erkek</label> <input type="radio"
                                        name="gender"
                                        value="MALE"
                                        onChange={this.onChange}
                                        />&nbsp;&nbsp;&nbsp;
                                        <label>Kadın</label>
                                        <input type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        onChange={this.onChange}
                                        />

                                        {errors.gender && (
                                            <div className="invalid-feedback">
                                                {errors.gender}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.referenceCode
                                            })}
                                            placeholder="Referans Kodu"
                                            name="referenceCode"
                                            value={this.state.referenceCode}
                                            onChange={this.onChange}
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
                    </div>
                </div>
            </div>
        );
    }
}


export default UserRegister;