import React from "react";
import styled from "styled-components";
import Logo from '../../resources/img/loginImage.png'
import {LinkStyled} from "../Navigation/navBar";
import {GreenButton} from "../../helpers/theme";

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

    render() {
        return (
            <LoginDiv>
                <Form className="login">
                    <img src={Logo} alt=''/>
                    <Input type="text" placeholder="Email"/><br/>
                    <Input type="password" placeholder="Hasło"/><br/>
                    <GreenButton type="submit">Zaloguj</GreenButton>
                    <LinkStyled to='/singup'>Załóż konto</LinkStyled>
                </Form>
            </LoginDiv>
        )
    }
}
