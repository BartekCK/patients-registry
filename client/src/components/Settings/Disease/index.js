import React from "react";
import styled from "styled-components";
import {GreenButton} from "../../../helpers/theme";
import {AddInput} from "./AddInput";
import * as _ from 'ramda';
import {getAllDiseases, getUserDiseases, postUserDiseases} from "../../../helpers/apiCommands";

const DiseaseDiv = styled.div`
display: flex;
justify-content: space-around;
height: 100%;
width: 100%;
@media screen and (max-width: 850px) {
flex-direction: column;
height: 65vh;

}
`;

const Select = styled.select`
width: 20vw;
height: 40px;
cursor: pointer;
background-color: transparent;
border: 3px solid #0AC986;
border-radius: 2px;
color: white;
font-size: 1em;
-webkit-appearance: none;
option {
color: white;
background-color: #181126;
display: flex;
white-space: pre;
min-height: 20px;
padding: 100px;
}
@media screen and (max-width: 850px) {
width: 100%;
margin: 10px 0 10px 0;
}
`;

export const AddButton = styled(GreenButton)`
margin: 0;
width: 20vw;

@media screen and (max-width: 850px) {
width: 100%;
margin: 10px 0 10px 0;
}
`;

const AddDiv = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
overflow: auto;
`;

export class DiseasePanel extends React.Component {

    state = {
        diseases: [{
            types: '',
            kinds: []
        }],
        type: '',
        kind: '',
        chooseList: []
    };

    componentDidMount = async () => {
        try {
            const response = await getAllDiseases();
            const diseases = [...response];
            const responseUser = await getUserDiseases();
            this.setState({chooseList: responseUser.data})

            const tempObject = [];
            const unique = new Set();

            diseases.forEach(disease => unique.add(disease.type));
            unique.forEach(type => {
                let temp = [];
                diseases.forEach(disease => {
                    if (disease.type === type) {
                        temp.push(disease.kind);
                    }
                });
                tempObject.push({types: type, kinds: temp});
            });
            this.setState({diseases: tempObject});

        } catch (e) {
            console.log(e);
        }
    };

    saveAll = async () => {
        try {
            const result = await postUserDiseases(this.state.chooseList)
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    addToList = () => {
        const {chooseList, type, kind} = this.state;
        if (type.length > 0 && kind.length > 0) {
            const temp = chooseList;
            temp.push({type: type, kind: kind});
            this.setState({chooseList: temp});
        }
    };

    deleteFromList = (id) => {
        this.setState({chooseList: _.remove(id, 1, this.state.chooseList)});
    };

    updateState = e => {
        if (e.target.name === 'type') {
            this.setState({kind: ''});
        }
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        return (
            <DiseaseDiv>
                <div>
                    <label>Typ </label>
                    <Select name='type' onChange={this.updateState}>
                        <option value=''/>
                        {this.state.diseases.map(disease => (
                            <option name='type' key={disease.types} value={disease.types}>{disease.types}</option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label>Rodzaj </label>
                    <Select name='kind' onChange={this.updateState}>
                        <option value=''/>
                        {this.state.diseases.map(disease => {
                            if (disease.types === this.state.type)
                                return disease.kinds.map(el => (<option key={el} value={el}>{el}</option>));
                            else
                                return null;
                        })}
                    </Select>
                </div>
                <AddDiv>
                    <div>
                        <AddButton onClick={this.addToList}>+</AddButton>
                        {this.state.chooseList.map((el, id) => (
                            <AddInput
                                key={id}
                                id={id}
                                kind={el.kind}
                                delete={this.deleteFromList}
                            />))}
                    </div>
                    <AddButton onClick={this.saveAll}>Zapisz</AddButton>
                </AddDiv>
            </DiseaseDiv>
        )
    }
}

