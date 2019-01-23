import React, {Component} from "react";
import classnames from "classnames";
import jwt_decode from "jwt-decode";

const axios = require('axios');

class Security {



    static setLoginCredentials(token, profilePicName,cityId) {
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("cityId", cityId);
        localStorage.setItem("profilePicName", profilePicName);


        const decoded_jwtToken = jwt_decode(localStorage.getItem("jwtToken"));
        localStorage.setItem("userId", decoded_jwtToken.id);
    }


    static logout() {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("cityId");
        localStorage.removeItem("profilePicName");

        window.location = "/login";
        return "";
    }


    static protect() {
       if(!Security.isValidToken()){
           window.stop();
           this.logout();
       }
    }


    static isValidToken(){
        if (!localStorage.getItem("jwtToken")) {
            return false;
        }

        const decoded_jwtToken = jwt_decode(localStorage.getItem("jwtToken"));
        const currentTime = Date.now() / 1000;
        if(decoded_jwtToken.exp < currentTime) {
            return false;
        }

        return true;
    }



    static authHeader(){
        return {
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            }
        }
    }


}

export default Security;