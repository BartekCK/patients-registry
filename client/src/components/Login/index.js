import React from "react";
import styled from "styled-components";
import Logo from '../../resources/img/loginImage.png'
import {LinkStyled} from "../Navigation/navBar";
import {GreenButton} from "../../helpers/theme";
import axios from 'axios';
import {Redirect} from 'react-router-dom'

const LoginDiv = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const Form = styled.form`
    padding: 30px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid white;
`;

const Input = styled.input`
    width: 100%;
    margin: 10px 0 10px 0;
    background: rgba(0,0,0,0.3);
    padding: 6px 0 6px 0;
    font-size: 13px;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    border: 2px solid rgba(0,0,0,0.3);
    border-radius: 4px;
    
    &:focus {
     box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2);
    }
 `;


export class LoginPanel extends React.Component {


    state = {
        username: '',
        password: '',
        isLogin: false
    };

    updateField = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://gps-server.now.sh/login', {...this.state})
            .then(response => {
                this.setState({isLogin: true});
                window.localStorage.setItem('token', response.data.access_token);
                this.props.setCredentials(response.data.access_token);
            })
            .catch(err => console.log(err));


    };

    render() {
        return (
            <LoginDiv>
                <Form className="login" onSubmit={this.handleSubmit}>
                    <img src={Logo} alt=''/>
                    <Input name='username' type="text" placeholder="Email" onChange={this.updateField}/><br/>
                    <Input name='password' type="password" placeholder="Hasło" onChange={this.updateField}/><br/>
                    <GreenButton type="submit">Zaloguj</GreenButton>
                    <LinkStyled to='/signup'>Załóż konto</LinkStyled>
                </Form>
                {this.state.isLogin && <Redirect to='/'/>}
            </LoginDiv>
        )
    }
}
