import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './pcComponents/Dashboard';
import GuestHeader from './pcComponents/common/GuestHeader';
import UserHeader from './pcComponents/common/UserHeader';
import Register from './pcComponents/user/nonauthenticated/Register';
import security from "./security/Security";

import Landing from "./pcComponents/common/Landing";
import Login from "./pcComponents/user/nonauthenticated/Login";
import UpdateInfo from "./pcComponents/user/self/UpdateInfo";
import UpdatePassword from "./pcComponents/user/self/UpdatePassword";
import UpdateProfilePic from "./pcComponents/user/self/UpdateProfilePic";
import MyAlbum from "./pcComponents/user/self/MyAlbum";
import Settings from "./pcComponents/user/self/Settings";
import VerifyMail from "./pcComponents/user/nonauthenticated/VerifyMail";
import SearchUser from "./pcComponents/user/other/SearchUser";
import ForgottenPassword from "./pcComponents/user/nonauthenticated/ForgottenPassword";
import ResetPassword from "./pcComponents/user/nonauthenticated/ResetPassword";
import Profile from "./pcComponents/user/other/Profile";
import Album from "./pcComponents/user/other/Album";
import CreateActivity from "./pcComponents/activity/CreateActivity";
import UpdateActivity from "./pcComponents/activity/UpdateActivity";
import UserActivities from "./pcComponents/activity/UserActivities";
import ActivityRequests from "./pcComponents/activity/ActivityRequests";
import MessagePage from "./pcComponents/message/MessagePage";
import Conversations from "./pcComponents/message/Conversations";
import ReviewForm from "./pcComponents/review/ReviewForm";
import ReferenceCodes from "./pcComponents/user/self/ReferenceCodes";
import Followings from "./pcComponents/user/self/Followings";
import Reviews from "./pcComponents/review/Reviews";
import Notifications from "./pcComponents/notification/Notifications";
import ActivityDetail from "./pcComponents/activity/ActivityDetail";
import Blocks from "./pcComponents/user/self/Blocks";
import ReviewDetail from "./pcComponents/review/ReviewDetail";
import Footer from "./pcComponents/common/Footer";
import LandingMobile from "./mobileComponents/common/LandingMobile";
import DashboardMobile from "./mobileComponents/DashboardMobile";
import RegisterMobile from "./mobileComponents/user/nonauthenticated/RegisterMobile";
import LoginMobile from "./mobileComponents/user/nonauthenticated/LoginMobile";
import SearchUserMobile from "./mobileComponents/user/other/SearchUserMobile";
import ForgottenPasswordMobile from "./mobileComponents/user/nonauthenticated/ForgottenPasswordMobile";
import ResetPasswordMobile from "./mobileComponents/user/nonauthenticated/ResetPasswordMobile";
import ProfileMobile from "./mobileComponents/user/other/ProfileMobile";
import VerifyMailMobile from "./mobileComponents/user/nonauthenticated/VerifyMailMobile";
import UpdateInfoMobile from "./mobileComponents/user/self/UpdateInfoMobile";
import UpdatePasswordMobile from "./mobileComponents/user/self/UpdatePasswordMobile";
import UpdateProfilePicMobile from "./mobileComponents/user/self/UpdateProfilePicMobile";
import MyAlbumMobile from "./mobileComponents/user/self/MyAlbumMobile";
import AlbumMobile from "./mobileComponents/user/other/AlbumMobile";
import SettingsMobile from "./mobileComponents/user/self/SettingsMobile";
import ReferenceCodesMobile from "./mobileComponents/user/self/ReferenceCodesMobile";
import FollowingsMobile from "./mobileComponents/user/self/FollowingsMobile";
import BlocksMobile from "./mobileComponents/user/self/BlocksMobile";
import CreateActivityMobile from "./mobileComponents/activity/CreateActivityMobile";
import UpdateActivityMobile from "./mobileComponents/activity/UpdateActivityMobile";
import UserActivitiesMobile from "./mobileComponents/activity/UserActivitiesMobile";
import ActivityRequestsMobile from "./mobileComponents/activity/ActivityRequestsMobile";
import ActivityDetailMobile from "./mobileComponents/activity/ActivityDetailMobile";
import MessagePageMobile from "./mobileComponents/message/MessagePageMobile";
import ConversationsMobile from "./mobileComponents/message/ConversationsMobile";
import ReviewFormMobile from "./mobileComponents/review/ReviewFormMobile";
import ReviewsMobile from "./mobileComponents/review/ReviewsMobile";
import ReviewDetailMobile from "./mobileComponents/review/ReviewDetailMobile";
import NotificationsMobile from "./mobileComponents/notification/NotificationsMobile";
import UserMenuMobile from "./mobileComponents/common/UserMenuMobile";
import HashtagActivity from "./pcComponents/activity/HashtagActivity";
import HashtagActivityMobile from "./mobileComponents/activity/HashtagActivityMobile";
import PremiumForm from "./pcComponents/premium/PremiumForm";
import PremiumFormMobile from "./mobileComponents/premium/PremiumFormMobile";
import Info from "./pcComponents/info/Info";
import InfoMobile from "./mobileComponents/info/InfoMobile";
import AboutMobile from "./mobileComponents/info/AboutMobile";
import ContactMobile from "./mobileComponents/info/ContactMobile";
import Contact from "./pcComponents/info/Contact";
import About from "./pcComponents/info/About";
import ADashboard from "./jshfsadf/ADashboard";
import Discover from "./pcComponents/event/Discover";
import ADiscoverList from "./jshfsadf/discover/ADiscoverList";
import ADiscoverCreate from "./jshfsadf/discover/ADiscoverCreate";
import ADiscoverUpdate from "./jshfsadf/discover/ADiscoverUpdate";
import Complain from "./pcComponents/user/other/Complain";
import ComplainMobile from "./mobileComponents/user/other/ComplainMobile";
import DiscoverMobile from "./mobileComponents/discover/DiscoverMobile";

const isMobile = require('is-mobile');
require("./pc.css");
require("./mobile.css")

class App extends Component {

    setPcHeader() {
        if (security.isValidToken()) {
            return <UserHeader/>
        }
        else {
            return <GuestHeader/>
        }
    }

    setPcFooter() {
        if (security.isValidToken()) {
            return <Footer/>
        }
        else {
            return "";
        }
    }

    setMobileMenu() {
        if (security.isValidToken()) {
            return <UserMenuMobile/>
        }
        // else {
        //     return <GuestMenuMobile/>
        // }
    }




    render() {


        if(!isMobile())
        return (
            <Router>
                <div className="App">
                    {this.setPcHeader()}
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
                    {<Route exact path="/hashtagActivity/:hashtag" component={HashtagActivity}/>}

                    {<Route exact path="/message/:id" component={MessagePage}/>}
                    {<Route exact path="/conversations/" component={Conversations}/>}

                    {<Route exact path="/reviewForm/:id" component={ReviewForm}/>}
                    {<Route exact path="/reviews/:id" component={Reviews}/>}
                    {<Route exact path="/review/:id" component={ReviewDetail}/>}

                    {<Route exact path="/notifications/" component={Notifications}/>}
                    {<Route exact path="/getPremium/" component={PremiumForm}/>}
                    {<Route exact path="/info/" component={Info}/>}
                    {<Route exact path="/contact/" component={Contact}/>}
                    {<Route exact path="/about/" component={About}/>}
                    {<Route exact path="/complain/:id/" component={Complain}/>}


                    {<Route exact path="/discover/" component={Discover}/>}

                    {<Route exact path="/sgjklnmf/dashboard" component={ADashboard}/>}
                    {<Route exact path="/sgjklnmf/discoverCreate" component={ADiscoverCreate}/>}
                    {<Route exact path="/sgjklnmf/discoverUpdate/:id" component={ADiscoverUpdate}/>}
                    {<Route exact path="/sgjklnmf/discoverList" component={ADiscoverList}/>}


                    {this.setPcFooter()}

                </div>
            </Router>
        );



        if(isMobile())
            return (
                <Router>
                    <div className="AppMobile">
                        {/*non authenticated*/}
                        {!security.isValidToken() && <Route exact path="/" component={LandingMobile}/>}
                        {security.isValidToken() && <Route exact path="/" component={DashboardMobile}/>}
                        {<Route exact path="/logout" render={() => security.logout()}/>}
                        {<Route exact path="/register" component={RegisterMobile}/>}
                        {<Route exact path="/login" component={LoginMobile}/>}
                        {<Route exact path="/searchUser" component={SearchUserMobile}/>}
                        {<Route exact path="/forgottenPassword" component={ForgottenPasswordMobile}/>}
                        {<Route exact path="/resetPassword/:token" component={ResetPasswordMobile}/>}
                        {<Route exact path="/profile/:id" component={ProfileMobile}/>}
                        {<Route exact path="/verifyMail/:token" component={VerifyMailMobile}/>}

                        {/*authenticated*/}
                        {<Route exact path="/updateInfo" component={UpdateInfoMobile}/>}
                        {<Route exact path="/updatePassword" component={UpdatePasswordMobile}/>}
                        {<Route exact path="/updateProfilePic" component={UpdateProfilePicMobile}/>}
                        {<Route exact path="/myAlbum" component={MyAlbumMobile}/>}
                        {<Route exact path="/album/:id" component={AlbumMobile}/>}
                        {<Route exact path="/settings" component={SettingsMobile}/>}
                        {<Route exact path="/referenceCodes" component={ReferenceCodesMobile}/>}
                        {<Route exact path="/followings" component={FollowingsMobile}/>}
                        {<Route exact path="/blocks" component={BlocksMobile}/>}

                        {<Route exact path="/createActivity" component={CreateActivityMobile}/>}
                        {<Route exact path="/updateActivity/:id" component={UpdateActivityMobile}/>}
                        {<Route exact path="/userActivities/:id" component={UserActivitiesMobile}/>}
                        {<Route exact path="/ActivityRequests/:id" component={ActivityRequestsMobile}/>}
                        {<Route exact path="/ActivityDetail/:id" component={ActivityDetailMobile}/>}
                        {<Route exact path="/hashtagActivity/:hashtag" component={HashtagActivityMobile}/>}


                        {<Route exact path="/message/:id" component={MessagePageMobile}/>}
                        {<Route exact path="/conversations/" component={ConversationsMobile}/>}

                        {<Route exact path="/reviewForm/:id" component={ReviewFormMobile}/>}
                        {<Route exact path="/reviews/:id" component={ReviewsMobile}/>}
                        {<Route exact path="/review/:id" component={ReviewDetailMobile}/>}

                        {<Route exact path="/notifications/" component={NotificationsMobile}/>}
                        {<Route exact path="/getPremium/" component={PremiumFormMobile}/>}
                        {<Route exact path="/info/" component={InfoMobile}/>}
                        {<Route exact path="/about/" component={AboutMobile}/>}
                        {<Route exact path="/contact/" component={ContactMobile}/>}
                        {<Route exact path="/complain/:id/" component={ComplainMobile}/>}
                        {<Route exact path="/discover/" component={DiscoverMobile}/>}



                        {this.setMobileMenu()}

                    </div>
                </Router>
            );
    }
}

export default App;
