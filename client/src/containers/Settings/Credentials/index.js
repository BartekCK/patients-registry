import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getUserInformation, putUserInformation} from "../../../helpers/apiCommands";
import {makeCancelable} from "../../../helpers/cancelAblePromise";
import {SimpleInput} from "../../../components/SimpleInput";
import {Button} from "react-bootstrap";


const Container = styled.div`
width: 100%;
height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CredentialsPanel = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        phone: '',
        password: ''
    });


    useEffect(() => {
        const userInf = makeCancelable(getUserInformation());

        userInf
            .promise
            .then(response => setCredentials({...response.data}))
            .catch(({isCanceled, ...error}) => console.log('isCanceled', isCanceled));

        return () => userInf.cancel();
    }, [])

    const setValues = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const saveValues = async () => {
        try {
            const result = await putUserInformation({...credentials})
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <SimpleInput name='email' onChange={setValues} value={credentials.email} label='Email'/>
            <SimpleInput name='phone' onChange={setValues} value={credentials.phone} label='Numer telefonu'/>
            <SimpleInput type='password' name='password' onChange={setValues} value={credentials.password}
                         label='Hasło'/>
            <Button className='w-25' variant='success' onClick={saveValues}>Zapisz</Button>
        </Container>)

}
