import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import security from "./security/Security";
import Landing from "./components/common/Landing";
import Dashboard from "./components/Dashboard";
import Register from "./components/user/nonauthenticated/Register";
import Login from "./components/user/nonauthenticated/Login";
import SearchUser from "./components/user/other/SearchUser";
import ForgottenPassword from "./components/user/nonauthenticated/ForgottenPassword";
import OtherProfile from "./components/user/other/OtherProfile";
import UpdateInfo from "./components/user/self/UpdateInfo";
import UpdatePassword from "./components/user/self/UpdatePassword";
import UpdateProfilePic from "./components/user/self/UpdateProfilePic";
import MyAlbum from "./components/user/self/MyAlbum";
import Album from "./components/user/other/Album";
import Settings from "./components/user/self/Settings";
import ReferenceCodes from "./components/user/self/ReferenceCodes";
import Followings from "./components/user/self/Followings";
import Blocks from "./components/user/self/Blocks";
import CreateEvent from "./components/event/CreateEvent";
import UpdateEvent from "./components/event/UpdateEvent";
import UserEvents from "./components/event/UserEvents";
import ActivityRequestsMobile from "./components/event/EventRequests";
import EventDetail from "./components/event/EventDetail";
import MessagePage from "./components/message/MessagePage";
import Conversations from "./components/message/Conversations";
import ReviewForm from "./components/review/ReviewForm";
import Reviews from "./components/review/Reviews";
import ReviewDetail from "./components/review/ReviewDetail";
import Notifications from "./components/notification/Notifications";
import UserMenu from "./components/common/UserMenu";
import HashtagActivityMobile from "./components/event/HashtagActivityMobile";
import Info from "./components/info/Info";
import About from "./components/info/About";
import Contact from "./components/info/Contact";
import ADiscoverList from "./jshfsadf/admin/discover/ADiscoverList";
import ADiscoverCreate from "./jshfsadf/admin/discover/ADiscoverCreate";
import ADiscoverUpdate from "./jshfsadf/admin/discover/ADiscoverUpdate";
import Complain from "./components/user/other/Complain";
import Discover from "./components/discover/Discover";
import UserGuide from "./components/info/UserGuide";
import PrivacyPolicy from "./components/info/PrivacyPolicy";
import Help from "./components/info/Help";
import Help2 from "./components/info/Help2";
import AdminPolice from "./jshfsadf/admin/police/AdminPolice";
import Top100 from "./components/info/Top100";
import VerifyPhoneMobile from "./components/user/nonauthenticated/VerifyPhone";
import MessageEventPage from "./components/messageEvent/MessageEventPage";
import ConversationsEvent from "./components/messageEvent/ConversationsEvent";
import AdminComplaints from "./jshfsadf/admin/police/AdminComplaints";
import UsersICanVote from "./components/info/UsersICanVote";
import Invite from "./components/event/Invite";
import EventAlbum from "./components/event/EventAlbum";
import Statistics from "./jshfsadf/admin/Statistics";
import Professionals from "./components/info/Professionals";
import MessagePageWall from "./components/wall/MessagePageWall";
import HowToPlayMobile from "./components/pandemi/HowToPlayMobile";
import PandemiMobile from "./components/pandemi/PandemiMobile";
import Interests from "./components/user/self/Interests";
import MyProfile from "./components/user/self/MyProfile";
import CategoryDetailMobile from "./components/category/CategoryDetail";
import AllEvents from "./components/event/AllEvents";
import Followers from "./components/user/self/Followers";
import ApplicationForm from "./components/user/application/ApplicationForm";

require("./compact.css");

class App extends Component {

    setMobileMenu() {
        if (security.isValidToken()) {
            return <UserMenu/>
        }
    }




    render() {


            return (
                <Router>
                    <div className="App">
                        {/*non authenticated*/}
                        {!security.isValidToken() && <Route exact path="/" component={Landing}/>}
                        {security.isValidToken() && <Route exact path="/" component={Dashboard}/>}
                        {<Route exact path="/logout" render={() => security.logout()}/>}
                        {<Route exact path="/applicationForm" component={ApplicationForm}/>}
                        {<Route exact path="/register" component={Register}/>}
                        {<Route exact path="/login" component={Login}/>}
                        {<Route exact path="/searchUser" component={SearchUser}/>}
                        {<Route exact path="/forgottenPassword" component={ForgottenPassword}/>}
                        {<Route exact path="/profile/:id" component={OtherProfile}/>}
                        {<Route exact path="/myProfile" component={MyProfile}/>}
                        {<Route exact path="/verifyPhone/" component={VerifyPhoneMobile}/>}

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

                        {<Route exact path="/createActivity" component={CreateEvent}/>}
                        {<Route exact path="/updateActivity/:id" component={UpdateEvent}/>}
                        {<Route exact path="/userActivities/:id" component={UserEvents}/>}
                        {<Route exact path="/ActivityRequests/:id" component={ActivityRequestsMobile}/>}
                        {<Route exact path="/ActivityDetail/:id" component={EventDetail}/>}
                        {<Route exact path="/hashtagActivity/:hashtag" component={HashtagActivityMobile}/>}
                        {<Route exact path="/activityAlbum/:id" component={EventAlbum}/>}


                        {<Route exact path="/message/:id" component={MessagePage}/>}
                        {<Route exact path="/conversations/" component={Conversations}/>}
                        {<Route exact path="/messageActivity/:id" component={MessageEventPage}/>}
                        {<Route exact path="/conversationsActivity/" component={ConversationsEvent}/>}


                        {<Route exact path="/reviewForm/:id" component={ReviewForm}/>}
                        {<Route exact path="/reviews/:id" component={Reviews}/>}
                        {<Route exact path="/review/:id" component={ReviewDetail}/>}

                        {<Route exact path="/notifications/" component={Notifications}/>}
                        {<Route exact path="/info/" component={Info}/>}
                        {<Route exact path="/about/" component={About}/>}
                        {<Route exact path="/contact/" component={Contact}/>}
                        {<Route exact path="/userGuide/" component={UserGuide}/>}
                        {<Route exact path="/privacyPolicy/" component={PrivacyPolicy}/>}
                        {<Route exact path="/help/" component={Help}/>}
                        {<Route exact path="/help2/" component={Help2}/>}
                        {<Route exact path="/top100/" component={Top100}/>}
                        {<Route exact path="/invite/:activityId" component={Invite}/>}


                        {<Route exact path="/complain/:id/" component={Complain}/>}
                        {<Route exact path="/discover/" component={Discover}/>}

                        {<Route exact path="/uhktybb/discoverCreate" component={ADiscoverCreate}/>}
                        {<Route exact path="/uhktybb/discoverUpdate/:id" component={ADiscoverUpdate}/>}
                        {<Route exact path="/uhktybb/discoverList" component={ADiscoverList}/>}
                        {<Route exact path="/uhktybb/police" component={AdminPolice}/>}
                        {<Route exact path="/uhktybb/complaints" component={AdminComplaints}/>}
                        {<Route exact path="/uhktybb/statistics" component={Statistics}/>}
                        {<Route exact path="/usersICanVibe" component={UsersICanVote}/>}
                        {<Route exact path="/professionals" component={Professionals}/>}
                        {<Route exact path="/ghostMessage" component={MessagePageWall}/>}
                        {<Route exact path="/corona/:difficulty" component={PandemiMobile}/>}
                        {<Route exact path="/howToPlay/:text" component={HowToPlayMobile}/>}
                        {<Route exact path="/categories/" component={Interests}/>}
                        {<Route exact path="/categoryDetail/:id" component={CategoryDetailMobile}/>}
                        {<Route exact path="/allActivities/" component={AllEvents}/>}
                        {<Route exact path="/myFollowers/" component={Followers}/>}

                        {this.setMobileMenu()}

                    </div>
                </Router>
            );
    }
}

export default App;
