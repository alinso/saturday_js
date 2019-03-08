import React from "react";
import Security from "../../security/Security";
import {withRouter} from 'react-router-dom';
import Globals from "../../util/Globals";

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
            hamburgerOpen:false,
            discoverActive:false
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
            this.setState({discoverActive: false});

        }
        if (pathname === "/notifications") {
            this.setState({seedActive: false});
            this.setState({createActive: false});
            this.setState({notActive: true});
            this.setState({discoverActive: false});

        }
        if (pathname === "/") {
            this.setState({seedActive: true});
            this.setState({createActive: false});
            this.setState({notActive: false});
            this.setState({discoverActive: false});

        }
        if (pathname === "/discover") {
            this.setState({seedActive: false});
            this.setState({createActive: false});
            this.setState({notActive: false});
            this.setState({discoverActive: true});
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
        axios.get(Globals.serviceUrl+'notification/newNotifications/', Security.authHeader())
            .then(function (response) {
                self.setState({notifications: response.data});
                response.data.map(function (not) {
                        self.setState({notification: true});
                });
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }






    render() {
        let notificationLinkProps = {title: "Bildirimler", class: "fa fa-bell"};

        if (this.state.notification === true) {
            notificationLinkProps = {title: "Yeni Bildirim!", class: "fas fa-bell lightOnGreen"};
        }



        const {seedActive}  =this.state;
        const {createActive}  =this.state;
        const {notActive}  =this.state;
        const {discoverActive}  =this.state;
        return (<div>
                <div className={this.state.hamburgerOpen ? "hamburgerContainerMobile" : "displayNone"}>
                    <div className={"hamburgerMenuItemMobile"}>
                        <a href={"/profile/"+localStorage.getItem("userId")}>Profilim</a>
                    </div>
                    <div className={"hamburgerMenuItemMobile"}>
                        <a href={"/conversations"}>Mesajlar</a>
                    </div>

                    <div className={"hamburgerMenuItemMobile"}>
                        <a href={"/searchUser"}>Kullanıcı Ara</a>
                    </div>
                    <div className={"hamburgerMenuItemMobile"}>
                        <a href={"/info"}>Nasıl Çalışır</a>
                    </div>
                    <div className={"hamburgerMenuItemMobile"}>
                        <a href={"/logout"}>Çıkış</a>
                    </div>

                </div>
                <div className="navbarMobile">
                    <a href="/" className={seedActive ? "active" :""}>
                        <span className={"menuIconMobile"}> <i className="fas fa-globe-americas"/></span>
                        <span className={"menuTitle"} hidden={!seedActive}> Akış</span>
                    </a>
                    <a href="/createActivity"  className={createActive ? "active" :""}>
                        <span className={"menuIconMobile"}> <i className="fas fa-glass-cheers"/></span>
                        <span className={"menuTitle"} hidden={!createActive}>Aktivite</span>
                    </a>

                    <a href="/discover"  className={discoverActive ? "active" :""}>
                        <span className={"menuIconMobile"}> <i className="fas fa-dice"/></span>
                        <span className={"menuTitle"} hidden={!discoverActive}> Jumanji</span>
                    </a>

                    <a href="/notifications"  className={notActive ? "active" :""}>
                        <span className={"menuIconMobile"}> <i title={notificationLinkProps.title} className={notificationLinkProps.class}/></span>
                        <span className={"menuTitle"} hidden={!notActive}> Bildirim</span>
                    </a>
                    <span className={"hamburgerButtonMobile"} onClick={this.hamburgerToggle}>
                        {!this.state.hamburgerOpen && (<i className="fas fa-bars"/>)}
                        {this.state.hamburgerOpen && (<i className="fas fa-times"/>)}
                    </span>
                </div>

            </div>
        )
    }

}

export default withRouter(UserMenuMobile);
