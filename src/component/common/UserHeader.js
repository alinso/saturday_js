import React from "react";
import {Link} from "react-router-dom";


class UserHeader extends React.Component {
    render() {
        return (


            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container-fluid col-md-8">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            <strong>Night Out</strong>
                        </Link>
                    </div>

                    <ul className="nav navbar-nav">
                        <li className="nav-item nav-link">
                            <a href={"/profile/"+localStorage.getItem("userId")}>Profilim</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li className="nav-item nav-link">
                            <a href={"/conversations/"}>Mesajlar</a>
                        </li>
                    </ul>
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
/*
*   <!-- <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <strong>Night Out</strong>
                    </Link>
                    <Link className="navbar-brand" to="/myProfile">
                        Profilim
                    </Link>
                    <Link className="navbar-brand" to="/searchUser">
                        Kullanıcı Ara
                    </Link>
                    <Link className="navbar-brand" to="/logout">
                        Çıkış Yap
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                </div>
            </nav>-->
* */