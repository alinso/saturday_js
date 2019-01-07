import React from "react";
import Security from "../../security/Security";
import classnames from "classnames";
import ProfilePic from "../common/ProfilePic";
import UserFullName from "../common/UserFullName";
const axios = require('axios');


class ReferenceForm extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            reference: "",
            profileDto: {},
            isPositive:true,
            saved: false,
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.saveReference = this.saveReference.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fillPage();
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();

        const reference = {
            reference: this.state.reference,
            reader: this.state.profileDto,
            positive:this.state.isPositive
        };
        this.saveReference(reference);
    }


    saveReference(referenceDto) {

        const self = this;
        axios.post('http://localhost:8080/review/writeAsFriend/', referenceDto, Security.authHeader())
            .then(function (response) {
                self.setState({saved: true});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    fillPage() {

        let self = this;

        //get the reader user
        axios.get('http://localhost:8080/user/profile/' + this.props.match.params.id)
            .then(function (response) {
                self.setState({profileDto: response.data});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({"errors": error.response.data});
            });

    }


    render() {

        return (
            <div className="row">
                <div className={"col-md-6 offset-3"}>
                    <ProfilePic
                        userId={this.props.match.params.id}
                        profilePicName={this.state.profileDto.profilePicName}
                    />
                    <UserFullName
                        name={this.state.profileDto.name}
                        surname={this.state.profileDto.surname}
                        userId={this.state.profileDto.id}
                    />
                    <h4>Bir Referans Yazın, referanslar silinemez ve düzenlenemez</h4>
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <textarea
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": this.state.errors.reference
                                })}
                                placeholder={"Bize " + this.state.profileDto.name + " hakkında birşeyler anlatın..."}
                                name="reference"
                                value={this.state.reference}
                                onChange={this.onChange}
                            />
                            {this.state.errors.reference && (
                                <div className="invalid-feedback">
                                    {this.state.errors.reference}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="customRadioLabel">Olumlu&nbsp;</label>
                            <input type="radio"
                                   name="isPositive"
                                   value={true}
                                   onChange={this.onChange}
                                   className="customRadio"
                            />&nbsp;&nbsp;&nbsp;&nbsp;
                            <label className="customRadioLabel">Olumsuz&nbsp;</label>
                            <input type="radio"
                                   name="isPositive"
                                   onChange={this.onChange}
                                   value={false}
                                   className="customRadio"
                            />
                            <br/>
                            <div className="invalid-feedback">
                                {this.state.errors.isPositive}
                            </div>

                        </div>

                        <input
                            type="submit"
                            value="Referansı Kaydet"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </form>
                    <br/>
                </div>
            </div>

        );
    }
}


export default ReferenceForm;