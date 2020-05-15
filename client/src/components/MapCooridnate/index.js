import * as React from "react";
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
                    <h3>Moje dane</h3>
                    <p>Mój numer: {phone}</p>
                    {disease &&
                    <>
                        <h3>Moje choroby</h3>
                        {disease.map((ill, id) => <p key={id}>{ill.kind}</p>)}
                    </>}
                    {}
                    {healthInformation &&
                    <>
                        <h3>Pomoc</h3>
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

export class MapCoordinate extends React.Component {

    state = {
        lat: 51.505,
        lng: -0.09,
        diseasesLocation: null,
        diseases: [],
        isHelp: false,
    };
    interval = null;

    componentDidMount = async () => {
        await this.updateMap();
        const unique = new Set();
        this.interval = setInterval(async () => {
            await this.updateMap()
        }, 1000);
        try {
            const response = await getAllDiseases();
            response.forEach(ob => unique.add(ob.type));
            this.setState({diseases: Array.from(unique)});
        } catch (e) {
            console.log(e);
        }
    };

    componentWillUnmount = () => {
        console.log('Delete timer');
        clearInterval(this.interval);
    };

    updateMap = async () => {
        try {
            const response = await getAllDiseasesCoordinates();
            this.setState({diseasesLocation: response});
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const position = [this.state.lat, this.state.lng];
        const {diseasesLocation} = this.state;
        return (
            <MapContainer>
                <FilterDiv>
                    <P>Typ:</P>
                    <Select name='type' onChange={this.updateState}>
                        <option value=''/>
                        {this.state.diseases.map(disease => (
                            <option name='type' key={disease} value={disease}>{disease}</option>
                        ))}
                    </Select>
                    <FilterDiv onClick={() => this.setState({isHelp: !this.state.isHelp})}>
                        <P>Tylko potrzebujący pomocy</P>
                        <input type='checkbox' value={this.state.isHelp} checked={this.state.isHelp} readOnly={true}/>
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
}

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
