import React from 'react';
import './App.css';
import {AppNav} from "./containers/Navigation";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Home} from "./containers/Home";
import {LoginPanel} from "./containers/Login";
import {SignUpPanel} from "./containers/SignUp";
import {SettingsProfile} from "./containers/Settings";
import {MapCoordinate} from "./containers/MapCooridnate";
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
                        <PrivateRoute exact path="/settings" component={SettingsProfile}/>
                    </AuthContextProvider>
                </Switch>
            </Router>
        )
    }

}

export default App;
