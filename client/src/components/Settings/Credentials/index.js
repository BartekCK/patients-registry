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

export class CredentialsPanel extends React.Component {

    state = {
        email: '',
        phone: '',
        password: ''
    };

    componentDidMount = () => {
        axios.get('https://gps-server.now.sh/users', ConfigApi)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err));
    };


    setValues = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    saveValues = async () => {
        await axios.put('https://gps-server.now.sh/users/',
            this.state,
            ConfigApi)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };


    render() {
        const {email, phone, password} = this.state;
        return (
            <Container>
                <Label>Email</Label>
                <Input value={email} name='email' onChange={this.setValues}/>
                <Label>Numer telefonu</Label>
                <Input value={phone} name='phone' onChange={this.setValues}/>
                <Label>Hasło</Label>
                <Input type='password' value={password} name='password' onChange={this.setValues}/>
                <AddButton onClick={this.saveValues}>Zapisz</AddButton>
            </Container>)
    }


}
