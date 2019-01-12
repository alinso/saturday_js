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
import UpdateInfo from "./component/user/authenticated/UpdateInfo";
import UpdatePassword from "./component/user/authenticated/UpdatePassword";
import UpdateProfilePic from "./component/user/authenticated/UpdateProfilePic";
import MyAlbum from "./component/user/authenticated/MyAlbum";
import Settings from "./component/user/authenticated/Settings";
import VerifyMail from "./component/user/nonauthenticated/VerifyMail";
import SearchUser from "./component/user/common/SearchUser";
import ForgottenPassword from "./component/user/nonauthenticated/ForgottenPassword";
import ResetPassword from "./component/user/nonauthenticated/ResetPassword";
import Profile from "./component/user/common/Profile";
import Album from "./component/user/common/Album";
import CreateMeeting from "./component/meeting/CreateMeeting";
import UpdateMeeting from "./component/meeting/UpdateMeeting";
import UserMeetings from "./component/meeting/UserMeetings";
import MeetingRequests from "./component/meeting/MeetingRequests";
import MessagePage from "./component/message/MessagePage";
import Conversations from "./component/message/Conversations";
import ReviewForm from "./component/review/ReviewForm";
import ReferenceCodes from "./component/user/authenticated/ReferenceCodes";
import Followings from "./component/user/authenticated/Followings";
import Reviews from "./component/review/Reviews";
import Notifications from "./component/notification/Notifications";
import MeetingDetail from "./component/meeting/MeetingDetail";
import Blocks from "./component/user/authenticated/Blocks";
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

                    {<Route exact path="/createMeeting" component={CreateMeeting}/>}
                    {<Route exact path="/updateMeeting/:id" component={UpdateMeeting}/>}
                    {<Route exact path="/userMeetings/:id" component={UserMeetings}/>}
                    {<Route exact path="/meetingRequests/:id" component={MeetingRequests}/>}
                    {<Route exact path="/meetingDetail/:id" component={MeetingDetail}/>}

                    {<Route exact path="/message/:id" component={MessagePage}/>}
                    {<Route exact path="/conversations/" component={Conversations}/>}

                    {<Route exact path="/reviewForm/:type/:id" component={ReviewForm}/>}
                    {<Route exact path="/reviews/:id" component={Reviews}/>}
                    {<Route exact path="/review/:id" component={ReviewDetail}/>}

                    {<Route exact path="/notifications/" component={Notifications}/>}


                    <Footer/>

                </div>
            </Router>
        );
    }
}

export default App;
