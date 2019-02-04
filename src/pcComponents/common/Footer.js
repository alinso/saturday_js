import React from "react";
import {Link} from "react-router-dom";


class Footer extends React.Component {
    render() {
        return (
            <div className={"col-md-5 m-auto footer"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <a className={"profileTitle"} href={"/"}>
                            <i className="fas fa-info-circle"/> hakkında</a>
                    </div>
                    <div className={"col-md-3"}>
                        <a className={"profileTitle"} href={"/"}>
                            <i className="far fa-envelope"/> iletişim</a>
                    </div>
                    <div className={"col-md-3"}>
                        <a  target={"_new"} className={"profileTitle"} href={"https://www.instagram.com/activityfriend/"}>
                            <i className="fab fa-instagram"/> instagram</a>
                    </div>
                    <div className={"col-md-3"}>
                        <a className={"profileTitle"} href={"/info"}>
                            <i className="fas fa-cog"/> nasıl çalışır</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
