import * as React from "react";
import {useEffect, useState} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet'
import styled from "styled-components";
import {getAllDiseases, getAllDiseasesCoordinates} from "../../helpers/apiCommands";
import {pointImage} from "../../helpers/routes";

const myIcon = L.icon({
    iconUrl: pointImage,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
});

const SetPositionMarker = ({disease, phone, healthInformation, coordinateInformation}) => {

    if (coordinateInformation) {
        return (
            <Marker
                icon={myIcon}
                position={[coordinateInformation.xCoordinate, coordinateInformation.yCoordinate]}>
                <Popup>
                    <H4>Moje dane</H4>
                    <p>Mój numer: {phone}</p>
                    {disease &&
                    <>
                        <H4>Moje choroby</H4>
                        {disease.map((ill, id) => <p key={id}>{ill.kind}</p>)}
                    </>}
                    {}
                    {healthInformation &&
                    <>
                        <H4>Pomoc</H4>
                        {healthInformation.emergencyNumber &&
                        <p>Numer alarmowy: {healthInformation.emergencyNumber}</p>}
                        {healthInformation.howHelp && <p>Jak pomóc: {healthInformation.howHelp}</p>}
                        {healthInformation.notDo && <p>Czego nie robić: {healthInformation.notDo}</p>}
                    </>}

                </Popup>
            </Marker>
        )
    } else
        return null;

};

export const MapCoordinate = () => {

    const [data, setData] = useState({
        lat: 51.505,
        lng: -0.09,
        diseasesLocation: null,
        diseases: [],
        isHelp: false,
    });

    useEffect(() => {
        let isCancel = false;
        const getFromApi = async () => {
            try {
                const diseasesCoord = await getAllDiseasesCoordinates();
                const diseases = await getAllDiseases();
                const unique = new Set();
                diseases.forEach(ob => unique.add(ob.type));
                if (!isCancel) {
                    setData((data) => ({...data, diseases: Array.from(unique), diseasesLocation: diseasesCoord}))
                }
            } catch (e) {
                console.log(e);
            }
        }
        getFromApi();

        let interval = setInterval(async () => {
            try {
                const diseasesCoord = await getAllDiseasesCoordinates();
                if (!isCancel) {
                    setData((data) => ({...data, diseasesLocation: diseasesCoord}));
                }
            } catch (e) {
                console.log(e);
            }
        }, 1000);

        return () => {
            isCancel = true;
            clearInterval(interval);
        }
    }, []);


    const position = [data.lat, data.lng];
    const {diseasesLocation} = data;
    return (
        <MapContainer>
            <FilterDiv>
                <P>Typ:</P>
                <Select name='type'>
                    <option value=''/>
                    {data.diseases.map(disease => (
                        <option name='type' key={disease} value={disease}>{disease}</option>
                    ))}
                </Select>
                <FilterDiv onClick={() => setData({...data, isHelp: !data.isHelp})}>
                    <P>Tylko potrzebujący pomocy</P>
                    <input type='checkbox' value={data.isHelp} checked={data.isHelp} readOnly={true}/>
                </FilterDiv>
            </FilterDiv>
            <Map className='map' center={position} zoom={3}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {diseasesLocation && diseasesLocation.map(person => {
                    return (
                        <SetPositionMarker
                            key={person._id}
                            disease={person.disease}
                            phone={person.phone}
                            healthInformation={person.healthInformation}
                            coordinateInformation={person.coordinateInformation}
                        />)
                })}
            </Map>
        </MapContainer>

    )

}

const H4 = styled.h4`
font-size: 1.3em;
font-weight: bold;
`

const P = styled.p`
font-size: 1em;
margin: 10px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  border-color: red;
  display: inline;
`;

const FilterDiv = styled.div`
width: auto;
display: flex;
align-items: center;
`;

const Select = styled.select`
width: 20vw;
height: 35px;
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
}
@media screen and (max-width: 850px) {
width: 100%;
margin: 10px 0 10px 0;
}
`;
