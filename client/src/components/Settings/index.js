import React from "react";
import styled from "styled-components";
import Watermark from '../../resources/watermark.png'
import {Route, NavLink, HashRouter} from "react-router-dom";
import {DiseasePanel} from "./Disease";
import {InformationPanel} from "./Information";
import {CredentialsPanel} from "./Credentials";

const SettingContainer = styled.div`
  display: flex;
  height: 89%;
  margin: 10px;
  background: url(${Watermark})no-repeat center center fixed; ;
  justify-content: space-between;
  
    @media screen and (max-width: 850px) {
      flex-direction: column;
      justify-content: space-between;
}
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

`;
const RightPanel = styled.div`
    width: 85vw;
    
    @media screen and (max-width: 850px) {
      width: 100%;
}
`;

const Button = styled.button`
    width: 200px;
    height: 200px;
    border:0.1em solid #FFFFFF;
    border-radius: 0.12em;
    font-weight:bold;
    font-size: 1.2em;
    color:#FFFFFF;
    text-align:center;
    transition: all 0.2s;
    background: transparent;
    
&:hover {
color:#000000;
background:#FFF


}
&:active {
background: #0099FF;
}
@media screen and (max-width: 850px) {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
`;

export class SettingsProfile extends React.Component {

    render() {
        return (
            <SettingContainer>
                <HashRouter>
                    <LeftPanel>

                        <NavLink exact to='/diseases'> <Button>Choroby</Button>
                        </NavLink>
                        <NavLink to='/information'> <Button>Informacje</Button>
                        </NavLink>
                        <NavLink to='/user'> <Button>Dane użytkownika</Button>
                        </NavLink>

                    </LeftPanel>
                    <RightPanel>
                        <Route path="/diseases" component={DiseasePanel}/>
                        <Route path="/information" component={InformationPanel}/>
                        <Route path="/user" component={CredentialsPanel}/>
                    </RightPanel>
                </HashRouter>
            </SettingContainer>);
    }

}
