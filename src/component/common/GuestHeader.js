import React from "react";
import {Link} from "react-router-dom";

class GuestHeader extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Night Out
                    </Link>
                    <Link className="navbar-brand" to="/register">
                        Kaydol
                    </Link>
                    <Link className="navbar-brand" to="/login">
                        Giriş Yap
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

export default GuestHeader;
