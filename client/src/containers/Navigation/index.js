import React from 'react';
import Logo from '../../resources/img/logo.png';
import User from '../../resources/img/user.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../context';
import { LOGOUT } from '../../context/reducer';

const UserImage = () => <img alt='' width='40' height='40' src={User} />;

export const AppNav = (props) => {
  const { authState, dispatch } = React.useContext(AuthContext);

  return (
    <Navbar className='bg-transparent' collapseOnSelect expand='lg'>
      <Link to='/'>
        <Navbar.Brand>
          <img
            alt=''
            src={Logo}
            width='40'
            height='40'
            className='d-inline-block align-top'
          />
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <HLink to='/map'>Mapa</HLink>
        </Nav>

        <Nav className='mr-1'>
          {!authState.isAuthenticated && (
            <>
              <HLink to='/zaloguj'>
                <Button variant='outline-success'>Zaloguj</Button>
              </HLink>
              <HLink to='/zarejestruj'>
                <Button variant='outline-danger'>Zarejestruj</Button>
              </HLink>
            </>
          )}
          {authState.isAuthenticated && (
            <NavDropdown
              as={Image}
              title={<UserImage />}
              id='dropdown-basic'
              drop='left'
            >
              <Vlink to='/settings'>Ustawienia</Vlink>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  dispatch({ type: LOGOUT, user: null });
                }}
              >
                Wyloguj się
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const HLink = styled(Link)`
  text-decoration: none;
  padding: 5px;
  color: azure;
  &:hover {
    text-decoration: none;
    color: #666666;
  }
`;

const Vlink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 4px 24px;
  color: #212429;
  &:hover {
    text-decoration: none;
    color: #666666;
  }
`;
