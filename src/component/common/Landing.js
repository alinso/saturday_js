import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {

  render() {
    return (
            <div className="row outer">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">

                </h1>
                <p className="lead">
                  NightOut'a hoşgeldin, başlamak için giriş yap veya kaydol
                </p>
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                  Sign Up
                </Link>
                <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                  Login
                </Link>
              </div>
            </div>
    );
  }
}

export default Landing;
