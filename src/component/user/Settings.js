import React from "react";
import classnames from "classnames";
import security from "../../security/Security";


class Settings extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <a href="/updateInfo/"><h3>Bilgilerimi Güncelle</h3></a>
                        <a href="/updatePassword/"><h3>Şifre Güncelle</h3></a>
                        <a href="/myAlbum/"><h3>Fotoğrafları Düzenle</h3></a>
                    </div>
                </div>
            </div>

        )
    }
}

export default Settings;