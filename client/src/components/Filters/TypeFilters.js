import {Dropdown} from "react-bootstrap";
import * as React from "react";

export const TypeFilter = ({diseases, goFilter, diseasesLocation}) => {

    const setDisease = async (disease) => {
        const filterDiseases = diseasesLocation.filter(el => el.disease.find(ill => ill.type === disease));
        goFilter(filterDiseases);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle style={{width: '200px'}}>Typ choroby</Dropdown.Toggle>
            <Dropdown.Menu>
                {diseases.length > 0 && diseases.map((disease, id) => (
                    <Dropdown.Item onClick={() => setDisease(disease)} key={id}>{disease}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>)

}
