import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Logo from "../../resources/img/logo.png";
import NavCloseImg from "../../resources/img/closeMenu.png";


const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: white;
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
        <button>Zaloguj</button>
        <button>Zarejestruj</button>
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
                    <a href="/login">Zaloguj</a>
                    <a href="/register">Zarejestruj</a>
                </nav>
            </div>
        );
    else
        return (<></>);
};

