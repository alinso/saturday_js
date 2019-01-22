import React from "react";
import {Link} from "react-router-dom";
import Security from "../../security/Security";
import ProfilePic from "./ProfilePic";
import Globals from "../../util/Globals";

const axios = require('axios');

class UserHeader extends React.Component {

    constructor() {
        super()
        this.state = {
            notifications: [],
            messageNotification: false,
            notification: false,
        }
        this.fillPage();
    }

    fillPage() {


        const self = this;
        axios.get(Globals.serviceUrl+'notification/newNotifications/', Security.authHeader())
            .then(function (response) {
                self.setState({notifications: response.data});


                response.data.map(function (not) {

                    console.log(not.notificationType);

                    if (not.notificationType.toString() === "MESSAGE")
                        self.setState({messageNotification: true});
                    if (not.notificationType.toString() !== "MESSAGE")
                        self.setState({notification: true});
                });

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }


    render() {
        let messageLinkProps = {title:"Mesajlar", class:"fas fa-2x fa-envelope"};
        let notificationLinkProps = {title: "Bildirimler",class: "fa fa-2x fa-bell"};

        if (this.state.messageNotification === true) {
             messageLinkProps = {title:"Yeni Mesaj", class:"fas fa-2x fa-envelope lightOnGreen"};
        }

        if (this.state.notification === true) {
             notificationLinkProps = {title: "Yeni Bildirim!",class: "fas fa-2x fa-bell lightOnGreen"};
        }


        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-menu">
                <div className="container-fluid col-md-8">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            <strong>AF Logo</strong>
                        </Link>
                    </div>

                    <ul className="nav navbar-nav">
                        <li className="nav-item nav-link">
                            <a href="/createActivity" className={"doSometingLink"} title={"Yeni Aktivite"}>
                                <i className="fas fa-2x fa-glass-cheers"/></a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right ">
                        <li className="nav-item nav-link">
                            <a href={"/conversations/"}><i className={messageLinkProps.class} title={messageLinkProps.title}/></a>
                        </li>
                        <li className="nav-item nav-link">
                            <a href={"/notifications/"}><i className={notificationLinkProps.class} title={notificationLinkProps.title}/></a>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <form className="form-inline my-2 my-lg-0" method="get" action="/searchUser">
                                <input className="form-control mr-sm-2" type="search" name="fullname"
                                       placeholder="isim..."
                                       aria-label="Search"/>
                                <button className="btn btn-primary my-2  my-sm-0" type="submit" title={"Ara"}>
                                    <i className="fas  fa-search"/>
                                </button>
                            </form>
                        </li>
                        <li className="nav-item nav-link menuProfilePic">
                            <ProfilePic
                                userId={localStorage.getItem("userId")}
                                profilePicName={localStorage.getItem("profilePicName")}
                                cssClass={"profilePicXSmall"}
                            />
                        </li>

                        <li className={"nav-item nav-link"}>
                            <a href="/logout" title={"Çıkış"}>
                                    <strong>
                                        <i className="fas fa-2x fa-sign-out-alt"/>
                                </strong>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}

export default UserHeader;
