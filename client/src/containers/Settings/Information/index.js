import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getUserInformation, postHealthInf} from "../../../helpers/apiCommands";
import {makeCancelable} from "../../../helpers/cancelAblePromise";
import {SimpleInput} from "../../../components/SimpleInput";
import {Button} from "react-bootstrap";


const Container = styled.div`
padding-top: 100px;
width: 100%;
height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
            .then(response => setState((state) => ({...state, ...response.data.healthInformation})))
            .catch(({isCanceled, ...error}) => console.log('isCanceled', isCanceled));
        return () => userInf.cancel();
    }, [])


    const setValues = e => {
        setState({...state, [e.target.name]: e.target.value})
    };

    const saveValues = async () => {
        try {
            const response = await postHealthInf({...state});
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    const {emergencyNumber, howHelp, notDo} = state;
    return (
        <Container>
            <SimpleInput name='emergencyNumber' onChange={setValues} value={emergencyNumber} label='Numer alarmowy'/>
            <SimpleInput name='howHelp' onChange={setValues} value={howHelp} label='Jak mi pomóc'/>
            <SimpleInput name='notDo' onChange={setValues} value={notDo} label='Czego nie robić'/>
            <Button className='w-25' variant='success' onClick={saveValues}>Zapisz</Button>
        </Container>)
}
