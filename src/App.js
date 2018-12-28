import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './component/Dashboard';
import GuestHeader from './component/common/GuestHeader';
import UserHeader from './component/common/UserHeader';
import Register from './component/user/Register';
import Profile from './component/user/Profile';
import security from "./security/Security";

import './App.css';
import Landing from "./component/common/Landing";
import Login from "./component/user/Login";
import UpdateInfo from "./component/user/UpdateInfo";
import UpdatePassword from "./component/user/UpdatePassword";
import UpdateProfilePic from "./component/user/UpdateProfilePic";

class App extends Component {

    setHeader(){
        if(security.isValidToken()){
            return <UserHeader/>
        }
        else {
            return <GuestHeader/>
        }
    }


    render() {
        return (
            <Router>
                <div className="App">
                    {this.setHeader()}
                    {<Route exact path="/" component={Landing}/>}
                    {<Route exact path="/logout" render={()=>security.logout()}/>}
                    {<Route exact path="/register" component={Register}/>}
                    {<Route exact path="/login" component={Login}/>}

                    {<Route exact path="/dashboard" component={Dashboard}/>}
                    {<Route exact path="/profile" component={Profile}/>}
                    {<Route exact path="/updateInfo" component={UpdateInfo}/>}
                    {<Route exact path="/updatePassword" component={UpdatePassword}/>}
                    {<Route exact path="/updateProfilePic" component={UpdateProfilePic}/>}


                </div>
            </Router>
        );
    }
}

export default App;
