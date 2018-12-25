import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './component/Home';
import Header from './component/common/Header';
import UserRegister from './component/user/UserRegister';
import ProfileUpdate from './component/user/ProfileUpdate';

import './App.css';
import Landing from "./component/common/Landing";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact path="/" component={Landing}/>
                    {<Route exact path="/user/register" component={UserRegister}/>}
                    {<Route exact path="/user/update/:id" component={ProfileUpdate}/>}
                </div>
            </Router>
        );
    }
}

export default App;
