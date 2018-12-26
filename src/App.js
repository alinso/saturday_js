import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './component/Home';
import Header from './component/common/Header';
import Register from './component/user/Register';
import ProfileUpdate from './component/user/ProfileUpdate';

import './App.css';
import Landing from "./component/common/Landing";
import Login from "./component/user/Login";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact path="/" component={Landing}/>
                    {<Route exact path="/login" component={Login}/>}
                    {<Route exact path="/register" component={Register}/>}
                    {<Route exact path="/user/update/:id" component={ProfileUpdate}/>}
                </div>
            </Router>
        );
    }
}

export default App;
