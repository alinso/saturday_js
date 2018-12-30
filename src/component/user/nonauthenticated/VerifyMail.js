import React from "react";
import security from "../../../security/Security";
const axios = require('axios');


class VerifyMail extends React.Component{
    constructor(props){
        super(props);
       this.tryToken();
    }

    tryToken(){

        console.log(this.props);
        const self  =this;
        const token=this.props.match.params.token;


        axios.get('http://localhost:8080/user/verifyMail/'+token)
            .then(function (response) {
                console.log(response);
                self.setState({"errors": {}});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }


    render(){
        return(<div>Mailiniz Onaylanmıştır!</div>)
    }
}

export default VerifyMail;