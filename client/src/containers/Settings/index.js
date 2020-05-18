import React, { useState } from 'react';
import styled from 'styled-components';
import Watermark from '../../resources/watermark.png';
import { DiseasePanel } from './Disease';
import { InformationPanel } from './Information';
import { CredentialsPanel } from './Credentials';

const SettingContainer = styled.div`
  display: flex;
  height: 89%;
  margin: 10px;
  background: url(${Watermark}) no-repeat center center fixed;
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

  @media screen and (max-width: 850px) {
    margin: 100px 0 100px 0;
  }
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

export const SettingsProfile = () => {
  const [component, setComponent] = useState('');
  return (
    <SettingContainer>
      <LeftPanel>
        <Button onClick={() => setComponent('DISEASE')}>Choroby</Button>
        <Button onClick={() => setComponent('INFORMATION')}>Informacje</Button>
        <Button onClick={() => setComponent('CREDENTIALS')}>
          Dane użytkownika
        </Button>
      </LeftPanel>
      <RightPanel>
        <DiseasePanelControl state={component} />
        <InformationPanelControl state={component} />
        <CredentialsPanelControl state={component} />
      </RightPanel>
    </SettingContainer>
  );
};

const DiseasePanelControl = ({ state }) => {
  if (state === 'DISEASE') return <DiseasePanel />;
  else return null;
};

const InformationPanelControl = ({ state }) => {
  if (state === 'INFORMATION') return <InformationPanel />;
  else return null;
};

const CredentialsPanelControl = ({ state }) => {
  if (state === 'CREDENTIALS') return <CredentialsPanel />;
  else return null;
};
