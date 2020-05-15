import React from "react";
import styled from "styled-components";
import Image from '../../resources/img/signUpData.png';
import {GreenButton} from "../../helpers/theme";
import {Redirect} from 'react-router-dom'
import {singUp} from "../../helpers/apiCommands";

const RegistrationPanel = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: space-around;
background-color: white;
color: black;

@media screen and (max-width: 850px){
  & > img {
    display: none;
  }
}
`;

const Form = styled.form`
display: flex;
flex-direction: column;

 & > label{
 font-weight: bold;
 padding-top: 5px;
 }
`;

const ErrorDiv = styled.div`
background: rgba(255,17,0,0.3);
text-align: center;
padding: 10px;
font-weight: 500;
`;

const validate = props => {
    if (!props.email)
        return 'Email jest wymagany';
    else if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(props.email)))
        return 'Niepoprawny email';

    if (!props.password)
        return 'Hasło jest wymagane';
    else if (props.password.length < 4)
        return 'Zbyt krótkie hasło';

    if (!props.passwordRep)
        return 'Powtórz hasło';

    if (props.password !== props.passwordRep)
        return 'Hasła nie są identyncze';

    if (!props.phone)
        return 'Brak numeru telefonu';
    else if (!(/\d{9}$/i.test(props.phone)))
        return 'Błędny numer';

    return null;

};


export class SignUpPanel extends React.Component {

    state = {
        email: '',
        password: '',
        passwordRep: '',
        phone: '',
        err: null,
        registered: false
    };

    updateField = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const tempErr = validate(this.state);
        this.setState({err: tempErr});
        if (!tempErr) {
            singUp({...this.state})
                .then(response => {
                    if (response.status === 201) {
                        this.setState({registered: true});
                    }
                })
                .catch(error => this.setState({err: error.message}));
        }
    };


    render() {

        return (
            <RegistrationPanel>
                <div>
                    {this.state.err && <ErrorDiv>{this.state.err}</ErrorDiv>}
                    <Form onSubmit={this.handleSubmit}>
                        <label>Email *</label> <input type='email' name='email' onChange={this.updateField}/>
                        <label>Hasło *</label> <input type='password' name='password' onChange={this.updateField}/>
                        <label>Powtórz hasło *</label> <input type='password' name='passwordRep'
                                                              onChange={this.updateField}/>
                        <label>Numer telefonu *</label> <input type='text' name='phone' onChange={this.updateField}/>
                        <GreenButton type='submit'>Załóż konto</GreenButton>
                    </Form>
                </div>
                <img src={Image} alt=''/>
                {this.state.registered && <Redirect to='/'/>}
            </RegistrationPanel>
        );
    }
}
