import React, {useState} from "react";
import styled from "styled-components";
import Logo from '../../resources/img/loginImage.png'
import {GreenButton} from "../../helpers/theme";
import {Link, Redirect} from 'react-router-dom'
import {signIn} from "../../helpers/apiCommands";
import {AuthContext} from "../../context";
import {LOGIN} from "../../context/reducer";


export const LoginPanel = (props) => {

    const {dispatch} = React.useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        isLogin: false
    });

    const updateField = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signIn({...credentials})
            const user = {token: response.data.access_token};
            dispatch({type: LOGIN, user: user});
            setCredentials({...credentials, isLogin: true});
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <LoginDiv>
            <Form className="login" onSubmit={handleSubmit}>
                <img src={Logo} alt=''/>
                <Input name='username' type="text" placeholder="Email" onChange={updateField}/><br/>
                <Input name='password' type="password" placeholder="Hasło" onChange={updateField}/><br/>
                <GreenButton type="submit">Zaloguj</GreenButton>
                <LinkStyled to='/signup'>Załóż konto</LinkStyled>
            </Form>
            {credentials.isLogin && <Redirect to='/'/>}
        </LoginDiv>
    )

}

export const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: white;
  &:hover{
      border-bottom: 1px solid #ccc;
  }
`;


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
