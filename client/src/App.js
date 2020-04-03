import React from 'react';
import './App.css';
import {Navigation} from "./components/Navigation";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Home} from "./components/Home";
import {LoginPanel} from "./components/Login";
import {SignUpPanel} from "./components/SignUp";
import {SettingsProfile} from "./components/Settings";
import {MapCoordinate} from "./components/MapCooridnate";

class App extends React.Component {

    state: {
        headers: null,
    };

    setCredentials = (token) => {
        this.setState({headers: {'Authorization': `Bearer ${token}`}});
    };

    componentDidMount = () => {
        const token = window.localStorage.getItem('token');
        if (token) {
            this.setCredentials(token);
        }
    };


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"><Navigation token={this.state} children={<Home/>}/></Route>
                    <Route exact path="/signin">
                        <LoginPanel setCredentials={this.setCredentials}/>
                    </Route>
                    <Route exact path='/signup' component={SignUpPanel}/>
                    <Route exact path="/map"><Navigation token={this.state} children={<MapCoordinate/>}/></Route>
                    <Route exact path="/settings"><Navigation token={this.state} children={<SettingsProfile/>}/></Route>
                </Switch>
            </Router>
        )
    }

}

export default App;
