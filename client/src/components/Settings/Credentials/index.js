import React, {useEffect, useState} from "react";
import {ShowInput} from "../Disease/AddInput";
import {AddButton} from "../Disease";
import styled from "styled-components";
import {getUserInformation, putUserInformation} from "../../../helpers/apiCommands";
import {makeCancelable} from "../../../helpers/cancelAblePromise";

const Input = styled(ShowInput)`
  width: 30%;
  margin: 20px 0 20px 0;
  @media screen and (max-width: 850px) {
width: 100%;

}
`;

const Container = styled.div`
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
            <Label>Email</Label>
            <Input value={credentials.email} name='email' onChange={setValues}/>
            <Label>Numer telefonu</Label>
            <Input value={credentials.phone} name='phone' onChange={setValues}/>
            <Label>Hasło</Label>
            <Input type='password' value={credentials.password} name='password' onChange={setValues}/>
            <AddButton onClick={saveValues}>Zapisz</AddButton>
        </Container>)

}
