import React from "react";
import {Link} from "react-router-dom";
import Security from "../../security/Security";
const axios = require('axios');


class UserHeader extends React.Component {

    constructor(){
        super()
        this.state={
            notifications:[],
            messageNotification:false,
            notification:false,
        }
        this.fillPage();
    }

    fillPage(){


        const self = this;
        axios.get('http://localhost:8080/notification/newNotifications/', Security.authHeader())
            .then(function (response) {
                self.setState({notifications: response.data});


                response.data.map(function (not) {

                    console.log(not.notificationType);

                    if(not.notificationType.toString()==="MESSAGE")
                        self.setState({messageNotification:true});
                    if(not.notificationType.toString()!=="MESSAGE")
                        self.setState({notification:true});
                });

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }


    render() {
        let messageText="Mesajlar";
        if(this.state.messageNotification===true){
            messageText="Mesajlar(*)";
        }


        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container-fluid col-md-8">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            <strong>{localStorage.getItem("userFullName")}</strong>
                        </Link>
                    </div>

                    <ul className="nav navbar-nav">
                        <li className="nav-item nav-link">
                            <a href={"/profile/"+localStorage.getItem("userId")}>Profilim</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li className="nav-item nav-link">
                            <a href={"/conversations/"}>{messageText}</a>
                        </li>
                    </ul>
                    {this.state.notification &&
                    (
                        <ul className="nav navbar-nav">
                            <li className="nav-item nav-link">
                                <a href={"/notifications/"}>Yeni Bildirim*</a>
                            </li>
                        </ul>)
                    }
                    <ul className="nav navbar-nav">
                        <li className="nav-item nav-link">
                            <a href="/createMeeting">Dışarı Çık</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className={"nav-item nav-link"}>
                            <form className="form-inline my-2 my-lg-0" method="get" action="/searchUser">
                                <input className="form-control mr-sm-2" type="search" name="fullname" placeholder="isim gir..."
                                       aria-label="Search"/>
                                <button className="btn btn-info my-2 my-sm-0" type="submit">Ara
                                </button>
                            </form>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <a href="/logout">
                                <button className="btn btn-outline-light my-2 my-sm-0" type="button"><strong>Çıkış Yap</strong></button>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}

export default UserHeader;
