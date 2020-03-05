import React from "react";
import styled from "styled-components";
import ImgBackground from '../../resources/img/background.png'


const HomeDiv = styled.div`
height: 100%;
width: 100%;
`;

const ImgDiv = styled.div`
  width: 35%;
  height: 100%;
  float: left;
  text-align: center;
  //background-color: #61dafb;
`;

const TextDiv = styled.div`
  width: 65%;
  height: 100%;
  float: left;
  //background-color: red;
  color: white;
`;

const Img = styled.img`
  width: 60%;
  margin: 40% 0 10% 0;
  height: 50%;
`;

const H1 = styled.h1`
margin: 25% 0 30px 0;
font-size: 3.9em;
`;

const P = styled.p`

`;

const Button = styled.button`
  margin-right: 10px;
  width: 200px;
  height: 35px;
  border: 3px dashed #a023ce;
  background-color: Transparent;
  
  font-weight: 900;
  font-size: 20px;
  color: white;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export class Home extends React.Component {

    render() {
        return (
            <HomeDiv>
                <ImgDiv>
                    <Img src={ImgBackground} alt='medic-app'/>
                </ImgDiv>
                <TextDiv>
                    <H1>Pomóż komuś, a może <br/>uratujesz samego siebie</H1>
                    <P>Za pomocą jednego kliknięcia znajdź osoby potrzebujące twojej pomocy</P>
                    <Button>szukaj</Button>
                </TextDiv>
            </HomeDiv>)
    }
}
