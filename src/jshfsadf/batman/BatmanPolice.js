import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import classnames from "classnames";

const axios = require('axios/index');


class BatmanPolice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: "",
            surname: "",
            userdata: false,
            extraPoint:0,
            savedMessage: false,
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.updatePoint=this.updatePoint.bind(this);
        this.updateExtraPoint=this.updateExtraPoint.bind(this);
    }



    db(type){
        let question="";
        let url="";
        let savedMessage="";
        if(type==='invalidName'){
            question  ="İsim güncellensin mi?";
            url="xbatmany/updateInvalidUserName";
            savedMessage="İsim güncellendi"
        }

        if(window.confirm(question)){
            let self = this;
            axios.get(Globals.serviceUrl + url+'/' + this.state.id, Security.authHeader())
                .then(function (response) {
                    self.setState({"errors": {}});
                    self.setState({"savedMessage": savedMessage});
                })
                .catch(function (error) {
                    self.setState({"errors": error.response.data});
                    self.setState({isSubmitDisabled: false});
                });
        }

    }
    updatePoint() {
        let self = this;
        axios.get(Globals.serviceUrl + 'xbatmany/updatePoint/' , Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Bilgiler guncellendi"});
                self.setState({"userdata": response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
            });
    }

    getInfo() {
        let self = this;
        axios.get(Globals.serviceUrl + 'xbatmany/userInfo/' + this.state.id, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Bilgiler Alındı"});
                self.setState({"userdata": response.data});
                self.setState({"extraPoint":response.data.extraPoint});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
            });
    }

    updateExtraPoint() {
        let self = this;
        axios.get(Globals.serviceUrl +  'xbatmany/updateExtraPoint/' + this.state.id+"/"+this.state.extraPoint, Security.authHeader())
            .then(function (response) {
                alert("Puan güncellendi");
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
                self.setState({isSubmitDisabled: false});
            });
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {

        const {savedMessage} = this.state;

        return (
            <div className="full-width container">
                <h4>Kişiyi Düzenle</h4>

                <hr/>
                <form>
                    <div className="form-group text-align-left">
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg")}
                            placeholder="Kullanıcı Id"
                            name="id"
                            value={this.state.id}
                            onChange={this.onChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block mt-4"
                        onClick={this.getInfo}
                    >Bilgileri Getir
                    </button>

                    <div className={"col-md-4 policeButtonDivMobile"}>
                        <button type={"button"} className={"btn btn-warning "} onClick={this.updatePoint}>
                            Puan güncelle
                        </button>
                    </div>
                    {this.state.userdata && (
                        <div>
                            <h4>{this.state.userdata.name} {this.state.userdata.surname}</h4>
                            <br/>
                            <div className={"row"}>
                                <div className={"col-md-4 policeButtonDivMobile"}>
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg")}
                                        placeholder="Ekstra puan"
                                        name="extraPoint"
                                        value={this.state.extraPoint}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className={"col-md-4  policeButtonDivMobile"}>
                                    <button  type={"button"} className={"btn btn-warning "} onClick={this.updateExtraPoint}>
                                        Exra Puanı Değiştir
                                    </button>
                                </div>
                                <div className={"col-md-4 policeButtonDivMobile"}>
                                    <button type={"button"} className={"btn btn-warning "} onClick={()=>this.db('invalidName')}>
                                        Geçersiz İsim
                                    </button>
                                </div>

                            </div>
                            <br/>
                        </div>


                    )}
                    {savedMessage && (
                        <div className={"alert alert-success"}>
                            <strong>{savedMessage}</strong>
                        </div>
                    )}
                </form>


                <br/>
            </div>

        );
    }


}

export default BatmanPolice;