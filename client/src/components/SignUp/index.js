import React from "react";
import styled from "styled-components";
// import axios from 'axios';
import Image from '../../resources/img/signUpData.png';
import {GreenButton} from "../../helpers/theme";

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
        diseases: [],
        email: '',
        password: '',
        passwordRep: '',
        phone: '',
        err: null
    };

    // componentDidMount = () => {
    //     axios.get('http://localhost:3001/diseases')
    //         .then(res => {
    //             this.setState({diseases: res.data.diseases});
    //         })
    // };

    updateField = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const tempErr = validate(this.state);
        this.setState({err: tempErr});
        if(tempErr) {

        }
    };


    render() {

        return (
            <RegistrationPanel>
                <div >
                    {this.state.err && <ErrorDiv ref={this.focusRef}>{this.state.err}</ErrorDiv>}
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
            </RegistrationPanel>
        );
    }
}
