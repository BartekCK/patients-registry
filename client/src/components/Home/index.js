import React from "react";
import ImgBackground from '../../resources/img/background.png'
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Button} from "react-bootstrap";

const TextDiv = styled.div`
    color: white;
    flex: 2;
    font-size: 50px;
    
    & > h1 {
    font-size: 1em;
    }
    & > p {
    font-size: 0.42em;
}
`;


const HomeContainer = styled.div`
    display: flex;
    height: 80%;
    width: 100vw;
    align-items: center;
    justify-content: space-around;
    
     
    & > img{
        max-width: 100%;
        height: auto;
    }
    
    @media screen and (max-width: 850px) {
    & > img{
        display: none;
    }

    & ${TextDiv} {
        text-align: center;
    }
}
`;


export class Home extends React.Component {

    render() {
        return (
            <HomeContainer>
                <img src={ImgBackground} alt='medic-app'/>
                <TextDiv>
                    <h1>Publiczny rejestr identyfikacyjny chorych osób</h1>
                    <p>Za pomocą jednego kliknięcia znajdź osoby potrzebujące twojej pomocy</p>
                    <Link to='/map'>
                        <Button variant='primary' className='w-25'>Szukaj</Button>
                    </Link>
                </TextDiv>
            </HomeContainer>)
    }
}
