import React, {useEffect, useState} from "react";
import {ShowInput} from "../Disease/AddInput";
import {AddButton} from "../Disease";
import styled from "styled-components";
import {getUserInformation, postHealthInf} from "../../../helpers/apiCommands";
import {makeCancelable} from "../../../helpers/cancelAblePromise";

const Input = styled(ShowInput)`
  width: 30%;
  margin: 20px 0 20px 0;
  @media screen and (max-width: 850px) {
width: 100%;

}
`;

const Container = styled.div`
padding-top: 100px;
width: 100%;
height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.2em;
`;

export const InformationPanel = () => {

    const [state, setState] = useState({
        emergencyNumber: '',
        howHelp: '',
        notDo: ''
    });

    useEffect(() => {
        const userInf = makeCancelable(getUserInformation());

        userInf
            .promise
            .then(response => setState((state)=>({...state, ...response.data.healthInformation})))
            .catch(({isCanceled, ...error}) => console.log('isCanceled', isCanceled));
        return () => userInf.cancel();
    }, [])


    const setValues = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    const saveValues = async () => {
        try {
            const response = await postHealthInf({...this.state});
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    const {emergencyNumber, howHelp, notDo} = state;
    return (
        <Container>
            <Label>Numer alarmowy</Label>
            <Input value={emergencyNumber} name='emergencyNumber' onChange={setValues}/>
            <Label>Jak mi pomóc</Label>
            <Input value={howHelp} name='howHelp' onChange={setValues}/>
            <Label>Czego nie robić</Label>
            <Input value={notDo} name='notDo' onChange={setValues}/>
            <AddButton onClick={saveValues}>Zapisz</AddButton>
        </Container>)
}
