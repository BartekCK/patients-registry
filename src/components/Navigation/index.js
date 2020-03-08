import React from "react";
import {NavBar, NavMobile} from "./navBar";
import Logo from '../../resources/img/logo.png'
import {Link} from "react-router-dom";
import NavImg from '../../resources/img/nav.png'

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
            <div className='navigation-container'>
                {this.state.width >= 850 ?
                    <NavBar/>
                    :
                    <>
                        <Link to="/"><img src={Logo} alt='logo'/></Link>
                        <img onClick={this.updateClick} src={NavImg} alt=''/>
                        <NavMobile isClicked={this.state.menuClick} click={this.updateClick}/>
                    </>
                }
            </div>
        );
    }

}
