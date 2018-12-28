import React from "react";
import classnames from "classnames";
import security from "../../security/Security";
const axios = require('axios');



class UpdateInfo extends React.Component{
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
            about:"",
            motivation:"",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.fillFields();
    }

    fillFields(){
        console.log(this.props);
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get('http://localhost:8080/user/id/'+userId,security.authHeader())
            .then(function (response) {
                console.log(response);
                self.setState(response.data);
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }

    updateUser(newUser) {
        console.log("profile updated");
        console.log(newUser);
        let self = this;
        axios.post('http://localhost:8080/user/updateInfo', newUser, security.authHeader())
            .then(function (response) {
                console.log(response);
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            id: localStorage.getItem("userId"),
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            phone: this.state.phone,
            gender: this.state.gender,
            referenceCode: this.state.referenceCode,
            about:this.state.about,
            motivation: this.state.motivation
        };
        this.updateUser(newUser);
    }


    render(){
        const {errors} = this.state;
        const show = {display: "inline"}


        return(
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Hakkımda</h5>
                                <hr/>
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

        )
    }
}

export default UpdateInfo;