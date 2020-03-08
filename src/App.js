import React from 'react';
import './App.css';
import {Navigation} from "./components/Navigation";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from "./components/Home";
import {LoginPanel} from "./components/Login";

class App extends React.Component {

    render() {
        return (
            <div className='application'>
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component ={Home}/>
                        <Route exact path="/signin" component ={LoginPanel}/>
                    </Switch>
                </Router>
            </div>
        )
    }

}

export default App;
