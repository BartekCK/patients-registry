import React from "react";
import {NavBar, NavMobile} from "./navBar";
import Logo from '../../resources/img/logo.png'
import {Link} from "react-router-dom";
import NavImg from '../../resources/img/nav.png'
import styled from "styled-components";

const NavigationContainer = styled.div`
    margin: 0 10px 0 10px;
    padding-top: 5px;
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
`;

export class Navigation extends React.Component {

    state = {
        width: 0,
        height: 0,
        menuClick: false,
    };

    componentDidMount = () => {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions);
    };

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };

    updateClick = () => {
        this.setState({menuClick: !this.state.menuClick})
    };

    render() {
        return (
            <div className='application'>
                <NavigationContainer>
                    {this.state.width >= 850 ?
                        <NavBar/>
                        :
                        <>
                            <Link to="/"><img src={Logo} alt='logo'/></Link>
                            <img onClick={this.updateClick} src={NavImg} alt=''/>
                            <NavMobile isClicked={this.state.menuClick} click={this.updateClick}
                            />
                        </>
                    }
                </NavigationContainer>
                {this.props.children}
            </div>


        );
    }

}
