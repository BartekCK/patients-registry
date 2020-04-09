import React, {useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Logo from "../../resources/img/logo.png";
import NavCloseImg from "../../resources/img/closeMenu.png";
import User from "../../resources/img/user.png";
import {Button} from "../../helpers/theme";

const ButtonSignUp = styled(Button)`
    border: 3px dashed #ce0005;
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: white;
  &:hover{
      border-bottom: 1px solid #ccc;
  }
`;


const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  & > ul li {
    list-style-type: none;
    float: left;
    margin: 0 5px;
    padding: 5px;
  }
  
  @media screen and (max-width: 850px) {
        padding: 10px;
        flex-direction: column;
        
        & >a {
            padding: 10px;
            color: white;
            text-decoration: none;
            width: 100%;
            text-align: left;
            
            &:hover {
            background-color: #282828;
            }
        }
  }
  
`;
const MenuContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 200px;
    background: #1a1a1a;
    text-align: right;
    
    &> img {
      margin: 13px 15px 0 10px;
    }
`;

const UserContainer = styled.div`
    position: absolute;
    right: 70px;
    top: 70px;
    background: #1a1a1a;
    width: 200px;

    
    & > Nav {
      padding: 10px;
      flex-direction: column;
      
       & >a {
            padding: 10px;
            color: white;
            text-decoration: none;
            width: 100%;
            text-align: left;
            
            &:hover {
            background-color: #282828;
            }
        }
    }  
`;

const UserProfile = () => {
    const [click, setClick] = useState(false);

    const clickAction = () => {
        setClick(!click);
    };

    return (
        <>
            <img src={User} alt='' onClick={clickAction}/>
            {click &&
            <UserContainer>
                <Nav>
                    <a href="/settings">Ustawienia</a>
                    <a href="/" onClick={() => window.localStorage.clear()}>Wyloguj</a>
                </Nav>
            </UserContainer>
            }
        </>)
};


export const NavMobile = (props) => {

    if (props.isClicked)
        return (
            <MenuContainer>
                <img src={NavCloseImg} onClick={props.click} alt=''/>
                <Nav>
                    <a href="/map">Mapa</a>
                    {!window.localStorage.getItem('token') ?
                        <>
                            <a href="/signin">Zaloguj</a>
                            <a href="/signup">Zarejestruj</a>
                        </> :
                        <>
                            <a href="/settings">Ustawienia</a>
                            <a href="/" onClick={() => window.localStorage.clear()}>Wyloguj</a>
                        </>
                    }
                </Nav>
            </MenuContainer>
        );
    else
        return (<></>);
};


const SingButtons = () => (
    <div>
        <Link to='/signin'>
            <Button>Zaloguj</Button>
        </Link>
        <Link to='/signup'>
            <ButtonSignUp>Zarejestruj</ButtonSignUp>
        </Link>
    </div>
);

export const NavBar = () => (
    <>
        <Nav>
            <Link to="/"><img src={Logo} alt='logo'/></Link>
        </Nav>
        {!window.localStorage.getItem('token') ?
            <SingButtons/> :
            <UserProfile/>
        }
    </>

);
