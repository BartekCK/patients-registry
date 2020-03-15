import React from "react";
import {ShowInput} from "../Disease/AddInput";
import {AddButton} from "../Disease";
import styled from "styled-components";
import axios from 'axios';
import {ConfigApi} from "../../../helpers/routes";

const Input = styled(ShowInput)`
  width: 30%;
  margin: 20px 0 20px 0;
  @media screen and (max-width: 850px) {
width: 100%;

}
`;

const Container = styled.div`
width: 100%;
height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.2em;
`;

export class InformationPanel extends React.Component {

    state = {
        emergencyNumber: '',
        howHelp: '',
        notDo: ''
    };

    componentDidMount = () => {
        axios.get('http://localhost:3001/users', ConfigApi)
            .then(response => this.setState(response.data.healthInformation))
            .catch(err => console.log(err));
    };


    setValues = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    saveValues = async () => {
        await axios.post('http://localhost:3001/users/health',
            this.state,
            ConfigApi)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };


    render() {
        const {emergencyNumber, howHelp, notDo} = this.state;
        return (
            <Container>
                <Label>Numer alarmowy</Label>
                <Input value={emergencyNumber} name='emergencyNumber' onChange={this.setValues}/>
                <Label>Jak mi pomóc</Label>
                <Input value={howHelp} name='howHelp' onChange={this.setValues}/>
                <Label>Czego nie robić</Label>
                <Input value={notDo} name='notDo' onChange={this.setValues}/>
                <AddButton onClick={this.saveValues}>Zapisz</AddButton>
            </Container>)
    }


}
