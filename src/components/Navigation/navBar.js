import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Logo from "../../resources/img/logo.png";
import NavCloseImg from "../../resources/img/closeMenu.png";


export const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: white;
  
  &:hover{
      border-bottom: 1px solid #ccc;

  }
`;


const NavigationItems = () => (
    <ul>
        <li>
            <LinkStyled to="/map">Mapa</LinkStyled>
        </li>
        <li>
            <LinkStyled to="/contact">Kontakt</LinkStyled>
        </li>
    </ul>
);

const SingButtons = () => (
    <div>
        <Link to='/signin'><button>Zaloguj</button></Link>
        <Link to='/signup'><button className='button-singup'>Zarejestruj</button></Link>
    </div>
);

export const NavBar = () => (
    <>
        <nav>
            <Link to="/"><img src={Logo} alt='logo'/></Link>
            <NavigationItems/>
        </nav>
        <SingButtons/>
    </>

);

export const NavMobile = (props) => {

    if (props.isClicked)
        return (
            <div className='menu-container'>
                <img src={NavCloseImg} onClick={props.click} alt=''/>
                <nav>
                    <a href="/map">Mapa</a>
                    <a href="/contact">Kontakt</a>
                    <a href="/signin">Zaloguj</a>
                    <a href="/signup">Zarejestruj</a>
                </nav>
            </div>
        );
    else
        return (<></>);
};

