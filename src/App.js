import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Dashboard from './pcComponents/Dashboard';
// import GuestHeader from './pcComponents/common/GuestHeader';
// import UserHeader from './pcComponents/common/UserHeader';
// import Register from './pcComponents/user/nonauthenticated/Register';
//
// import Landing from "./pcComponents/common/Landing";
// import Login from "./pcComponents/user/nonauthenticated/Login";
// import UpdateInfo from "./pcComponents/user/self/UpdateInfo";
// import UpdatePassword from "./pcComponents/user/self/UpdatePassword";
// import UpdateProfilePic from "./pcComponents/user/self/UpdateProfilePic";
// import MyAlbum from "./pcComponents/user/self/MyAlbum";
// import Settings from "./pcComponents/user/self/Settings";
// import SearchUser from "./pcComponents/user/other/SearchUser";
// import ResetPassword from "./pcComponents/user/nonauthenticated/ResetPassword";
// import Profile from "./pcComponents/user/other/Profile";
// import Album from "./pcComponents/user/other/Album";
// import CreateActivity from "./pcComponents/activity/CreateActivity";
// import UpdateActivity from "./pcComponents/activity/UpdateActivity";
// import UserActivities from "./pcComponents/activity/UserActivities";
// import ActivityRequests from "./pcComponents/activity/ActivityRequests";
// import MessagePage from "./pcComponents/message/MessagePage";
// import Conversations from "./pcComponents/message/Conversations";
// import ReviewForm from "./pcComponents/review/ReviewForm";
// import ReferenceCodes from "./pcComponents/user/self/ReferenceCodes";
// import Followings from "./pcComponents/user/self/Followings";
// import Reviews from "./pcComponents/review/Reviews";
// import Notifications from "./pcComponents/notification/Notifications";
// import ActivityDetail from "./pcComponents/activity/ActivityDetail";
// import Blocks from "./pcComponents/user/self/Blocks";
// import ReviewDetail from "./pcComponents/review/ReviewDetail";
// import Footer from "./pcComponents/common/Footer";
import security from "./security/Security";
import LandingMobile from "./mobileComponents/common/LandingMobile";
import DashboardMobile from "./mobileComponents/DashboardMobile";
import RegisterMobile from "./mobileComponents/user/nonauthenticated/RegisterMobile";
import LoginMobile from "./mobileComponents/user/nonauthenticated/LoginMobile";
import SearchUserMobile from "./mobileComponents/user/other/SearchUserMobile";
import ForgottenPasswordMobile from "./mobileComponents/user/nonauthenticated/ForgottenPasswordMobile";
import ResetPasswordMobile from "./mobileComponents/user/nonauthenticated/ResetPasswordMobile";
import OtherProfileMobile from "./mobileComponents/user/other/OtherProfileMobile";
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
import HashtagActivityMobile from "./mobileComponents/activity/HashtagActivityMobile";
import PremiumFormMobile from "./mobileComponents/premium/PremiumFormMobile";
import InfoMobile from "./mobileComponents/info/InfoMobile";
import AboutMobile from "./mobileComponents/info/AboutMobile";
import ContactMobile from "./mobileComponents/info/ContactMobile";
import ADiscoverList from "./jshfsadf/admin/discover/ADiscoverList";
import ADiscoverCreate from "./jshfsadf/admin/discover/ADiscoverCreate";
import ADiscoverUpdate from "./jshfsadf/admin/discover/ADiscoverUpdate";
import ComplainMobile from "./mobileComponents/user/other/ComplainMobile";
import DiscoverMobile from "./mobileComponents/discover/DiscoverMobile";
import UserGuideMobile from "./mobileComponents/info/UserGuideMobile";
import PrivacyPolicyMobile from "./mobileComponents/info/PrivacyPolicyMobile";
import HelpMobile from "./mobileComponents/info/HelpMobile";
import HelpMobile2 from "./mobileComponents/info/HelpMobile2";
import AdminPolice from "./jshfsadf/admin/police/AdminPolice";
import Top100 from "./mobileComponents/info/Top100";
import VerifyPhoneMobile from "./mobileComponents/user/nonauthenticated/VerifyPhoneMobile";
import MessageActivityPageMobile from "./mobileComponents/messageActivity/MessageActivityPageMobile";
import ConversationsActivityMobile from "./mobileComponents/messageActivity/ConversationsActivityMobile";
import AdminComplaints from "./jshfsadf/admin/police/AdminComplaints";
import UsersICanVibe from "./mobileComponents/info/UsersICanVibe";
import InviteMobile from "./mobileComponents/activity/InviteMobile";
import ActivityAlbum from "./mobileComponents/activity/ActivityAlbum";
import Statistics from "./jshfsadf/admin/Statistics";
import Professionals from "./mobileComponents/info/Professionals";
import GhostMessagePageMobile from "./mobileComponents/ghostMessage/GhostMessagePageMobile";
import HowToPlayMobile from "./mobileComponents/pandemi/HowToPlayMobile";
import PandemiMobile from "./mobileComponents/pandemi/PandemiMobile";
import Categories from "./mobileComponents/user/self/CategoriesMobile";
import MyProfileMobile from "./mobileComponents/user/self/MyProfileMobile";


const isMobile = require('is-mobile');
require("./pc.css");
require("./mobile.css");

class App extends Component {

    // setPcHeader() {
    //     if (security.isValidToken()) {
    //         return <UserHeader/>
    //     }
    //     else {
    //         return <GuestHeader/>
    //     }
    // }
    //
    // setPcFooter() {
    //     if (security.isValidToken()) {
    //         return <Footer/>
    //     }
    //     else {
    //         return "";
    //     }
    // }

    setMobileMenu() {
        if (security.isValidToken()) {
            return <UserMenuMobile/>
        }
        // else {
        //     return <GuestMenuMobile/>
        // }
    }




    render() {


        // if(!isMobile() && false)
        // return (
        //     <Router>
        //         <div className="App">
        //             {this.setPcHeader()}
        //             {/*non authenticated*/}
        //             {!security.isValidToken() && <Route exact path="/" component={Landing}/>}
        //             {security.isValidToken() && <Route exact path="/" component={Dashboard}/>}
        //             {<Route exact path="/logout" render={() => security.logout()}/>}
        //             {<Route exact path="/uyghkbsdkjhvvvhjvjb" component={Register}/>}
        //             {<Route exact path="/login" component={Login}/>}
        //             {<Route exact path="/searchUser" component={SearchUser}/>}
        //             {<Route exact path="/resetPassword/:token" component={ResetPassword}/>}
        //             {<Route exact path="/profile/:id" component={Profile}/>}
        //             {<Route exact path="/verifyPhone/" component={VerifyPhone}/>}
        //             {<Route exact path="/register/" component={Register}/>}
        //
        //             {/*authenticated*/}
        //             {<Route exact path="/updateInfo" component={UpdateInfo}/>}
        //             {<Route exact path="/updatePassword" component={UpdatePassword}/>}
        //             {<Route exact path="/updateProfilePic" component={UpdateProfilePic}/>}
        //             {<Route exact path="/myAlbum" component={MyAlbum}/>}
        //             {<Route exact path="/album/:id" component={Album}/>}
        //             {<Route exact path="/settings" component={Settings}/>}
        //             {<Route exact path="/referenceCodes" component={ReferenceCodes}/>}
        //             {<Route exact path="/followings" component={Followings}/>}
        //             {<Route exact path="/blocks" component={Blocks}/>}
        //
        //             {<Route exact path="/createActivity" component={CreateActivity}/>}
        //             {<Route exact path="/updateActivity/:id" component={UpdateActivity}/>}
        //             {<Route exact path="/userActivities/:id" component={UserActivities}/>}
        //             {<Route exact path="/ActivityRequests/:id" component={ActivityRequests}/>}
        //             {<Route exact path="/ActivityDetail/:id" component={ActivityDetail}/>}
        //             {<Route exact path="/hashtagActivity/:hashtag" component={HashtagActivity}/>}
        //
        //             {<Route exact path="/message/:id" component={MessagePage}/>}
        //             {<Route exact path="/conversations/" component={Conversations}/>}
        //
        //             {<Route exact path="/reviewForm/:id" component={ReviewForm}/>}
        //             {<Route exact path="/reviews/:id" component={Reviews}/>}
        //             {<Route exact path="/review/:id" component={ReviewDetail}/>}
        //
        //             {<Route exact path="/notifications/" component={Notifications}/>}
        //             {<Route exact path="/getPremium/" component={PremiumForm}/>}
        //             {<Route exact path="/info/" component={Info}/>}
        //             {<Route exact path="/contact/" component={Contact}/>}
        //             {<Route exact path="/about/" component={About}/>}
        //
        //             {<Route exact path="/userGuide/" component={UserGuide}/>}
        //             {<Route exact path="/privacyPolicy/" component={PrivacyPolicy}/>}
        //             {<Route exact path="/complain/:id/" component={Complain}/>}
        //
        //
        //             {<Route exact path="/discover/" component={Discover}/>}
        //
        //             {<Route exact path="/uhktybb/discoverCreate" component={ADiscoverCreate}/>}
        //             {<Route exact path="/uhktybb/discoverUpdate/:id" component={ADiscoverUpdate}/>}
        //             {<Route exact path="/uhktybb/discoverList" component={ADiscoverList}/>}
        //             {<Route exact path="/uhktybb/police" component={AdminPolice}/>}
        //             {<Route exact path="/uhktybb/complaints" component={AdminComplaints}/>}
        //             {<Route exact path="/uhktybb/statistics" component={Statistics}/>}
        //             {<Route exact path="/oldbatmanassss" component={BatmanPolice}/>}
        //             {<Route exact path="/uhktybb/premium" component={PremiumForm}/>}
        //             {<Route exact path="/corona/:difficulty" component={Pandemi}/>}
        //             {<Route exact path="/howToPlay/:text" component={HowToPlay}/>}
        //             {<Route exact path="/ghostMessage" component={GhostMessagePage}/>}
        //
        //
        //
        //             {!window.location.href.includes("corona") && this.setPcFooter()}
        //
        //         </div>
        //     </Router>
        // );
        //


        if(isMobile() || true)
            return (
                <Router>
                    <div className="App">
                        {/*non authenticated*/}
                        {!security.isValidToken() && <Route exact path="/" component={LandingMobile}/>}
                        {security.isValidToken() && <Route exact path="/" component={DashboardMobile}/>}
                        {<Route exact path="/logout" render={() => security.logout()}/>}
                        {<Route exact path="/register" component={RegisterMobile}/>}
                        {<Route exact path="/login" component={LoginMobile}/>}
                        {<Route exact path="/searchUser" component={SearchUserMobile}/>}
                        {<Route exact path="/forgottenPassword" component={ForgottenPasswordMobile}/>}
                        {<Route exact path="/resetPassword/:token" component={ResetPasswordMobile}/>}
                        {<Route exact path="/profile/:id" component={OtherProfileMobile}/>}
                        {<Route exact path="/myProfile" component={MyProfileMobile}/>}
                        {<Route exact path="/verifyPhone/" component={VerifyPhoneMobile}/>}

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
                        {<Route exact path="/activityAlbum/:id" component={ActivityAlbum}/>}


                        {<Route exact path="/message/:id" component={MessagePageMobile}/>}
                        {<Route exact path="/conversations/" component={ConversationsMobile}/>}
                        {<Route exact path="/messageActivity/:id" component={MessageActivityPageMobile}/>}
                        {<Route exact path="/conversationsActivity/" component={ConversationsActivityMobile}/>}


                        {<Route exact path="/reviewForm/:id" component={ReviewFormMobile}/>}
                        {<Route exact path="/reviews/:id" component={ReviewsMobile}/>}
                        {<Route exact path="/review/:id" component={ReviewDetailMobile}/>}

                        {<Route exact path="/notifications/" component={NotificationsMobile}/>}
                        {<Route exact path="/getPremium/" component={PremiumFormMobile}/>}
                        {<Route exact path="/info/" component={InfoMobile}/>}
                        {<Route exact path="/about/" component={AboutMobile}/>}
                        {<Route exact path="/contact/" component={ContactMobile}/>}
                        {<Route exact path="/userGuide/" component={UserGuideMobile}/>}
                        {<Route exact path="/privacyPolicy/" component={PrivacyPolicyMobile}/>}
                        {<Route exact path="/help/" component={HelpMobile}/>}
                        {<Route exact path="/help2/" component={HelpMobile2}/>}
                        {<Route exact path="/top100/" component={Top100}/>}
                        {<Route exact path="/invite/:activityId" component={InviteMobile}/>}


                        {<Route exact path="/complain/:id/" component={ComplainMobile}/>}
                        {<Route exact path="/discover/" component={DiscoverMobile}/>}

                        {<Route exact path="/uhktybb/discoverCreate" component={ADiscoverCreate}/>}
                        {<Route exact path="/uhktybb/discoverUpdate/:id" component={ADiscoverUpdate}/>}
                        {<Route exact path="/uhktybb/discoverList" component={ADiscoverList}/>}
                        {<Route exact path="/uhktybb/police" component={AdminPolice}/>}
                        {<Route exact path="/uhktybb/complaints" component={AdminComplaints}/>}
                        {<Route exact path="/uhktybb/premium" component={PremiumFormMobile}/>}
                        {<Route exact path="/uhktybb/statistics" component={Statistics}/>}
                        {<Route exact path="/usersICanVibe" component={UsersICanVibe}/>}
                        {<Route exact path="/professionals" component={Professionals}/>}
                        {<Route exact path="/ghostMessage" component={GhostMessagePageMobile}/>}
                        {<Route exact path="/corona/:difficulty" component={PandemiMobile}/>}
                        {<Route exact path="/howToPlay/:text" component={HowToPlayMobile}/>}
                        {<Route exact path="/categories/" component={Categories}/>}




                        {this.setMobileMenu()}

                    </div>
                </Router>
            );
    }
}

export default App;
