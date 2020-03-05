import React from "react";
import styled from 'styled-components'
import Logo from '../../resources/img/logo.png'
import {Link} from "react-router-dom";

const NavBar = styled.div`
width: 100%;
height: 72px;
position: absolute;
//background-color: white;
`;

const Nav = styled.nav`
  float: left;
  display: inline-block;
  width: auto;
  margin: 5px 5px;
`;

const Img = styled.img`
    float: left;
`;

const Ul = styled.ul`
  float: left;
  list-style-type: none;
  margin: 0;
  width: auto;
`;

const Li = styled.li`
  float: left;
`;

const ButtonSection = styled.div`
  float: right;
  padding: 19px;
  display: inline-block;
`;

const LinkStyled = styled(Link)`
  display: inline-block;
  color: white;
  text-align: center;
  margin: 0 5px;
  padding: 22px;
  text-decoration: none;
  font-size: 20px;
`;

const LoginButton = styled.button`
  margin-right: 10px;
  width: 200px;
  height: 35px;
  border: 3px dashed #41CE2A;
  background-color: Transparent;
  
  font-weight: 900;
  font-size: 20px;
  color: white;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;
const RegisterButton = styled(LoginButton)`
    border: 3px dashed #FF0000;
`;



export class Navigation extends React.Component {

    render() {
        return (
            <NavBar>
                <Nav>
                    <Link to="/">
                        <Img src={Logo} alt='logo'/>
                    </Link>
                    <Ul>
                        <Li>
                            <LinkStyled to="/map">Mapa</LinkStyled>
                        </Li>
                        <Li>
                            <LinkStyled to="/contact">Kontakt</LinkStyled>
                        </Li>
                    </Ul>
                </Nav>

                <ButtonSection>
                    <LoginButton>zaloguj</LoginButton>
                    <RegisterButton>zarejestruj</RegisterButton>
                </ButtonSection>

            </NavBar>
        );
    }

}
