import React from 'react';
import './App.css';
import {AppNav} from "./components/Navigation";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Home} from "./components/Home";
import {LoginPanel} from "./components/Login";
import {SignUpPanel} from "./components/SignUp";
import {SettingsProfile} from "./components/Settings";
import {MapCoordinate} from "./components/MapCooridnate";
import {AuthContextProvider} from "./context";
import {PrivateRoute} from "./helpers/PrivateRoute";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <AuthContextProvider>
                        <AppNav/>
                        <Route exact path="/"><Home/></Route>
                        <Route exact path="/zaloguj"><LoginPanel setCredentials={this.setCredentials}/></Route>
                        <Route exact path='/zarejestruj' component={SignUpPanel}/>
                        <Route exact path="/map"><MapCoordinate/></Route>
                        <PrivateRoute exact path="/settings"><SettingsProfile/></PrivateRoute>
                    </AuthContextProvider>
                </Switch>
            </Router>
        )
    }

}

export default App;
