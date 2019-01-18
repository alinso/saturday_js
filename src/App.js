import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './component/Dashboard';
import GuestHeader from './component/common/GuestHeader';
import UserHeader from './component/common/UserHeader';
import Register from './component/user/nonauthenticated/Register';
import security from "./security/Security";

import './App.css';
import Landing from "./component/common/Landing";
import Login from "./component/user/nonauthenticated/Login";
import UpdateInfo from "./component/user/self/UpdateInfo";
import UpdatePassword from "./component/user/self/UpdatePassword";
import UpdateProfilePic from "./component/user/self/UpdateProfilePic";
import MyAlbum from "./component/user/self/MyAlbum";
import Settings from "./component/user/self/Settings";
import VerifyMail from "./component/user/nonauthenticated/VerifyMail";
import SearchUser from "./component/user/other/SearchUser";
import ForgottenPassword from "./component/user/nonauthenticated/ForgottenPassword";
import ResetPassword from "./component/user/nonauthenticated/ResetPassword";
import Profile from "./component/user/other/Profile";
import Album from "./component/user/other/Album";
import CreateActivity from "./component/activity/CreateActivity";
import UpdateActivity from "./component/activity/UpdateActivity";
import UserActivities from "./component/activity/UserActivities";
import ActivityRequests from "./component/activity/ActivityRequests";
import MessagePage from "./component/message/MessagePage";
import Conversations from "./component/message/Conversations";
import ReviewForm from "./component/review/ReviewForm";
import ReferenceCodes from "./component/user/self/ReferenceCodes";
import Followings from "./component/user/self/Followings";
import Reviews from "./component/review/Reviews";
import Notifications from "./component/notification/Notifications";
import ActivityDetail from "./component/activity/ActivityDetail";
import Blocks from "./component/user/self/Blocks";
import ReviewDetail from "./component/review/ReviewDetail";
import Footer from "./component/common/Footer";

const isMobile = require('is-mobile');


class App extends Component {

    setHeader() {
        if (security.isValidToken()) {
            return <UserHeader/>
        }
        else {
            return <GuestHeader/>
        }
    }

    setFooter() {
        if (security.isValidToken()) {
            return <Footer/>
        }
        else {
            return "";
        }
    }


    render() {
        return (
            <Router>
                <div className="App">
                    {!isMobile() && this.setHeader()}
                    {/*non authenticated*/}
                    {!security.isValidToken() && <Route exact path="/" component={Landing}/>}
                    {security.isValidToken() && <Route exact path="/" component={Dashboard}/>}
                    {<Route exact path="/logout" render={() => security.logout()}/>}
                    {<Route exact path="/register" component={Register}/>}
                    {<Route exact path="/login" component={Login}/>}
                    {<Route exact path="/searchUser" component={SearchUser}/>}
                    {<Route exact path="/forgottenPassword" component={ForgottenPassword}/>}
                    {<Route exact path="/resetPassword/:token" component={ResetPassword}/>}
                    {<Route exact path="/profile/:id" component={Profile}/>}
                    {<Route exact path="/verifyMail/:token" component={VerifyMail}/>}

                    {/*authenticated*/}
                    {/*{<Route exact path="/myprofile" component={Profile}/>}*/}
                    {<Route exact path="/updateInfo" component={UpdateInfo}/>}
                    {<Route exact path="/updatePassword" component={UpdatePassword}/>}
                    {<Route exact path="/updateProfilePic" component={UpdateProfilePic}/>}
                    {<Route exact path="/myAlbum" component={MyAlbum}/>}
                    {<Route exact path="/album/:id" component={Album}/>}
                    {<Route exact path="/settings" component={Settings}/>}
                    {<Route exact path="/referenceCodes" component={ReferenceCodes}/>}
                    {<Route exact path="/followings" component={Followings}/>}
                    {<Route exact path="/blocks" component={Blocks}/>}

                    {<Route exact path="/createActivity" component={CreateActivity}/>}
                    {<Route exact path="/updateActivity/:id" component={UpdateActivity}/>}
                    {<Route exact path="/userActivities/:id" component={UserActivities}/>}
                    {<Route exact path="/ActivityRequests/:id" component={ActivityRequests}/>}
                    {<Route exact path="/ActivityDetail/:id" component={ActivityDetail}/>}

                    {<Route exact path="/message/:id" component={MessagePage}/>}
                    {<Route exact path="/conversations/" component={Conversations}/>}

                    {<Route exact path="/reviewForm/:type/:id" component={ReviewForm}/>}
                    {<Route exact path="/reviews/:id" component={Reviews}/>}
                    {<Route exact path="/review/:id" component={ReviewDetail}/>}

                    {<Route exact path="/notifications/" component={Notifications}/>}


                    {this.setFooter()}

                </div>
            </Router>
        );
    }
}

export default App;
