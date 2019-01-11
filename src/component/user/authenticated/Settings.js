import React from "react";
import classnames from "classnames";
import security from "../../../security/Security";


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
                        <a href="/updateProfilePic/"><h3>Profil Fotoğrafım</h3></a>
                        <a href="/updateInfo/"><h3>Bilgilerimi Güncelle</h3></a>
                        <a href="/myAlbum/"><h3>Fotoğrafları Düzenle</h3></a>
                        <a href="/updatePassword/"><h3>Şifre Güncelle</h3></a>
                        <a href="/referenceCodes/"><h3>Referanslarım</h3></a>
                        <a href="/followings/"><h3>Bildirim Listem</h3></a>
                        <a href="/blocks/"><h3>Engellediğim Kişiler</h3></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;