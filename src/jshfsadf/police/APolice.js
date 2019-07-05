import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import classnames from "classnames";

const axios = require('axios');


class APolice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: "",
            surname: "",
            phone: null,
            email: false,
            userdata: false,
            savedMessage: false,
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.updatePoint=this.updatePoint.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }



    db(type){
        let question="";
        let url="";
        let savedMessage="";
        if(type==='invalidName'){
            question  ="İsim güncellensin mi?";
            url="updateUser";
            savedMessage="İsim güncellendi"
        }
        if(type==='resetPassword'){
            question  ="Şifre sıfırlansın mi?";
            url="resetPassword";
            savedMessage="Şifre Sıfırlandı:123456";
        }
        if(type==='deleteUser'){
            question  ="KULLANICI SİLİNSİN Mİ?";
            url="deleteUser";
            savedMessage="Kullanıcı silindi";
        }

        if(window.confirm(question)){
            let self = this;
            axios.get(Globals.serviceUrl + Globals.adminUrl + url+'/' + this.state.id, Security.authHeader())
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
        axios.get(Globals.serviceUrl + Globals.adminUrl + 'updatePoint/' , Security.authHeader())
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
    sendMessage() {
        let self = this;
        axios.get(Globals.serviceUrl + Globals.adminUrl + 'autoMessage/' , Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Bilgiler guncellendi"});
                self.setState({"userdata": response.data});
            })

    }

    getInfo() {
        let self = this;
        axios.get(Globals.serviceUrl + Globals.adminUrl + 'userInfo/' + this.state.id, Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({"savedMessage": "Bilgiler Alındı"});
                self.setState({"userdata": response.data});
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
        const {errors} = this.state;
        const {photoName} = this.state;

        return (
            <div className="full-width container">
                <h4> Keşfet Oluştur</h4>

                {photoName && (
                    <img className={"meetingFormPhoto"} src={"/upload/" + photoName}/>
                )}
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
                    <div className={"col-md-4 policeButtonDivMobile"}>
                        <button type={"button"} className={"btn btn-warning "} onClick={this.updatePoint}>
                            Puan güncelle
                        </button>
                    </div>
                    <div className={"col-md-4 policeButtonDivMobile"}>
                        <button type={"button"} className={"btn btn-warning "} onClick={this.sendMessage}>
                            Toplu Mesaj Gönder
                        </button>
                    </div>
                    {this.state.userdata && (
                        <div>
                            {this.state.userdata.name} {this.state.userdata.surname}
                            <br/>
                            {this.state.userdata.phone}
                            <br/>
                            {this.state.userdata.email}
                            <div className={"row"}>

                                <div className={"col-md-4 policeButtonDivMobile"}>
                                    <button type={"button"} className={"btn btn-warning "} onClick={()=>this.db('invalidName')}>
                                        Geçersiz İsim
                                    </button>
                                </div>
                                <div className={"col-md-4  policeButtonDivMobile"}>
                                    <button  type={"button"} className={"btn btn-warning "} onClick={()=>this.db('resetPassword')}>
                                        Şifre Yenile
                                    </button>
                                </div>
                                <div className={"col-md-4 policeButtonDivMobile"}>
                                    <button  type={"button"} className={"btn btn-danger "} onClick={()=>this.db('deleteUser')}>
                                        X Sil X
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
                <button
                    type="button"
                    className="btn btn-primary btn-block mt-4"
                    onClick={this.getInfo}
                >Bilgileri Getir
                </button>

                <br/>
            </div>

        );
    }


}

export default APolice;