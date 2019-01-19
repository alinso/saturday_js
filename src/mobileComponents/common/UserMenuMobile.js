import React from "react";
import Security from "../../security/Security";
import {withRouter} from 'react-router-dom';

const axios = require('axios');

class UserMenuMobile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
            messageNotification: false,
            notification: false,
            seedActive: false,
            createActive: false,
            notActive: false,
            hamburgerOpen:false
        };


        this.hamburgerToggle  =this.hamburgerToggle.bind(this);
        this.fillPage();
    }

    componentDidMount(){
        const {pathname} = this.props.location;


        if (pathname === "/createActivity") {
            this.setState({seedActive: false});
            this.setState({createActive: true});
            this.setState({notActive: false});
        }
        if (pathname === "/notifications") {
            console.log("xx");
            this.setState({seedActive: false});
            this.setState({createActive: false});
            this.setState({notActive: true});
        }
        if (pathname === "/") {
            this.setState({seedActive: true});
            this.setState({createActive: false});
            this.setState({notActive: false});
        }
    }

    hamburgerToggle(){
        if(this.state.hamburgerOpen)
            this.setState({hamburgerOpen:false});
        else
            this.setState({hamburgerOpen:true});
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/notification/newNotifications/', Security.authHeader())
            .then(function (response) {
                self.setState({notifications: response.data});
                response.data.map(function (not) {
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
        let messageLinkProps = {title: "Mesajlar", class: "fas fa-2x fa-envelope"};
        let notificationLinkProps = {title: "Bildirimler", class: "fa fa-2x fa-bell"};

        if (this.state.messageNotification === true) {
            messageLinkProps = {title: "Yeni Mesaj", class: "fas fa-2x fa-envelope lightOnGreen"};
        }

        if (this.state.notification === true) {
            notificationLinkProps = {title: "Yeni Bildirim!", class: "fas fa-2x fa-bell lightOnGreen"};
        }



        const {seedActive}  =this.state;
        const {createActive}  =this.state;
        const {notActive}  =this.state;
        return (<div>
                <div className={this.state.hamburgerOpen ? "hamburgerContainer" : "displayNone"}>
                    <div className={"hamburgerMenuItem"}>
                        <a href={"/profile/"+localStorage.getItem("userId")}>Profilim</a>
                    </div>
                    <div className={"hamburgerMenuItem"}>
                        <a href={"/conversations"}>Mesajlar</a>
                    </div>

                    <div className={"hamburgerMenuItem"}>
                        <a href={"/"}>Profilim</a>
                    </div>
                    <div className={"hamburgerMenuItem"}>
                        <a href={"/logout"}>Çıkış</a>
                    </div>

                </div>
                <div className="navbar_mobile">
                    <a href="/" className={seedActive ? "active" :""}>
                        <span className={"menuIcon"}> <i className="fas fa-globe-americas"/></span>
                        <span className={"menuTitle"} hidden={!seedActive}> Ana Sayfa</span>
                    </a>
                    <a href="/createActivity"  className={createActive ? "active" :""}>
                        <span className={"menuIcon"}> <i className="fas fa-glass-cheers"/></span>
                        <span className={"menuTitle"} hidden={!createActive}> + Aktivite</span>
                    </a>
                    <a href="/notifications"  className={notActive ? "active" :""}>
                        <span className={"menuIcon"}> <i className="far fa-bell"/></span>
                        <span className={"menuTitle"} hidden={!notActive}> Bildirimler</span>
                    </a>
                    <span className={"hamburgerButton"} onClick={this.hamburgerToggle}>
                        {!this.state.hamburgerOpen && (<i className="fas fa-bars"/>)}
                        {this.state.hamburgerOpen && (<i className="fas fa-times"/>)}
                    </span>
                </div>

            </div>
        )
    }

}

export default withRouter(UserMenuMobile);
