import React from 'react';
import './App.css';
import {Navigation} from "./components/Navigation";
import {BrowserRouter as Router} from 'react-router-dom'
import {Home} from "./components/Home";

class App extends React.Component {

    render() {
        return (
            <div className='application'>
                <Router>
                    <Navigation/>
                    <Home/>
                </Router>
            </div>
        )
    }

}

export default App;
