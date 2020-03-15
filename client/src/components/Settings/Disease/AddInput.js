import React from "react";
import styled from "styled-components";
import {GreenButton} from "../../../helpers/theme";

const ShowInput = styled.input`
  width: 80%;
    height: 40px;
    background-color: transparent;
    border: 3px solid #0AC986;
    border-radius: 2px;
    color: white;
    font-size: 1em;
    padding: 0;

`;

const MinusButton = styled(GreenButton)`
width: 20%;
height: 46px;
background: #a30000;
margin: 0;
`;

const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
`;

export const AddInput = (props) => {

    const destroy = () => {
        props.delete(props.id);
    };

    return (
        <Container>
            <ShowInput value={props.kind} type='text' disabled={true}/>
            <MinusButton onClick={destroy}>-</MinusButton>
        </Container>
    );

};
