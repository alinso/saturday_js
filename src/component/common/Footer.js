import React from "react";
import {Link} from "react-router-dom";


class Footer extends React.Component {
    render() {
        return (
            <div className={"col-md-5 m-auto footer"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <a href={"/"}>Hakkında</a>
                    </div>
                    <div className={"col-md-3"}>
                        <a href={"/"}>İletişim</a>
                    </div>
                    <div className={"col-md-3"}>
                        <a href={"/"}>İnstagram</a>
                    </div>
                    <div className={"col-md-3"}>
                        <a href={"/"}>Nasıl Çalışır</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
