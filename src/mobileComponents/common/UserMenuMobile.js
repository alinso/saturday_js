import React from "react";
import Security from "../../security/Security";
import {stack as Menu} from 'react-burger-menu';

const axios = require('axios');

class UserMenuMobile extends React.Component {

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
        axios.get('http://localhost:8080/notification/newNotifications/', Security.authHeader())
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
        let messageLinkProps = {title: "Mesajlar", class: "fas fa-2x fa-envelope"};
        let notificationLinkProps = {title: "Bildirimler", class: "fa fa-2x fa-bell"};

        if (this.state.messageNotification === true) {
            messageLinkProps = {title: "Yeni Mesaj", class: "fas fa-2x fa-envelope lightOnGreen"};
        }

        if (this.state.notification === true) {
            notificationLinkProps = {title: "Yeni Bildirim!", class: "fas fa-2x fa-bell lightOnGreen"};
        }


        var styles = {
            bmBurgerButton: {
                position: 'fixed',
                width: '36px',
                height: '30px',
                bottom: '10px',
                right: '10px',
                color: 'white'
            },
            bmBurgerBars: {
                background: '#373a47'
            },

            bmCrossButton: {
                height: '36px',
                width: '36px',
                top: '13px',
                right: '32px'
            },
            bmCross: {
                background: '#bdc3c7',
                height: '9px',
                width: '36px',
            },
            bmMenuWrap: {
                position: 'fixed',
                height: '100%',
                width: '50%'
            },
            bmMenu: {
                background: '#373a47',
                padding: '0.5em 0.5em 0',
                fontSize: '1.15em',
                height: '150px',
                marginTop: '-150px'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em'
            },
            bmItem: {
                display: 'inline-block'
            },
            bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
            }
        };


        return (<div>


                <div className="navbar_mobile">
                    <a href="#home" className="active">
                        <span className={"menuIcon"}> <i className="fas fa-globe-americas"/></span>
                        <span className={"menuTitle"}> Ana Sayfa</span>
                    </a>
                    <a href="#news">
                        <span className={"menuIcon"}> <i className="fas fa-glass-cheers"/></span>
                        <span className={"menuTitle"} hidden={true}> + Aktivite</span>
                    </a>
                    <a href="#news">
                        <span className={"menuIcon"}> <i className="far fa-bell"/></span>
                        <span className={"menuTitle"} hidden={true}> Bildirimler</span>
                    </a>

                </div>

                <Menu right styles={styles}>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                </Menu>
            </div>
        )
    }

}

export default UserMenuMobile;
