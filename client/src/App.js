import React from 'react';
import './App.css';
import {Navigation} from "./components/Navigation";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from "./components/Home";
import {LoginPanel} from "./components/Login";
import {SignUpPanel} from "./components/SignUp";

class App extends React.Component {

    render() {
        return (
                <Router>
                    <Switch>
                        <Route exact path="/"><Navigation children={<Home/>}/></Route>
                        <Route exact path="/signin" component ={LoginPanel}/>
                        <Route exact path='/signup' component={SignUpPanel}/>
                    </Switch>
                </Router>

        )
    }

}

export default App;
