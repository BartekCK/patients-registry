import React from 'react';
import './App.css';
import styled from 'styled-components'
import {Navigation} from "./components/Navigation";
import {BrowserRouter as Router} from 'react-router-dom'
import {Home} from "./components/Home";
const Application = styled.div`
  width: 100%;
  height: 100%;
  background-color: #181126;
`;

class App extends React.Component {

    render() {
        return (
            <Application>
                <Router>
                    <Navigation/>
                    <Home/>
                </Router>
            </Application>
        )
    }

}

export default App;
