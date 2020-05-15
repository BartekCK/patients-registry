import React from "react";
import {ShowInput} from "../Disease/AddInput";
import {AddButton} from "../Disease";
import styled from "styled-components";
import {getUserInformation, postHealthInf} from "../../../helpers/apiCommands";

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

export class InformationPanel extends React.Component {

    state = {
        emergencyNumber: '',
        howHelp: '',
        notDo: ''
    };

    componentDidMount = () => {
        getUserInformation()
            .then(response => {
                console.log(response);
                this.setState(response.data.healthInformation)
            })
            .catch(err => console.log(err));
    };


    setValues = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    saveValues = async () => {
        try {
            const response = await postHealthInf({...this.state});
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };


    render() {
        const {emergencyNumber, howHelp, notDo} = this.state;
        return (
            <Container>
                <Label>Numer alarmowy</Label>
                <Input value={emergencyNumber} name='emergencyNumber' onChange={this.setValues}/>
                <Label>Jak mi pomóc</Label>
                <Input value={howHelp} name='howHelp' onChange={this.setValues}/>
                <Label>Czego nie robić</Label>
                <Input value={notDo} name='notDo' onChange={this.setValues}/>
                <AddButton onClick={this.saveValues}>Zapisz</AddButton>
            </Container>)
    }


}
