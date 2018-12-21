import React from "react";
import {Link} from "react-router-dom";


class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Home
                    </Link>
                    <Link className="navbar-brand" to="/user/register">
                        Kaydol
                    </Link>
                    <Link className="navbar-brand" to="/user/update">
                        Güncelle
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
            </nav>
        )
    }
}

export default Header;
