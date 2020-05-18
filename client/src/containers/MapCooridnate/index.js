import * as React from "react";
import {useEffect, useState} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet'
import styled from "styled-components";
import {getAllDiseases, getAllDiseasesCoordinates} from "../../helpers/apiCommands";
import {pointImage} from "../../helpers/routes";
import {SimpleInput} from "../../components/SimpleInput/SimpleInput";
import {Button} from "react-bootstrap";
import {TypeFilter} from "../../components/Filters/TypeFilters";
import Row from "react-bootstrap/Row";
import {HelpFilter} from "../../components/Filters/HelpFilter";
import UserGps from '../../resources/img/userGps.png'


const myIcon = L.icon({
    iconUrl: pointImage,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
});

const userIcon = L.icon({
    iconUrl: UserGps,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
});

const SetPositionMarker = ({id, disease, phone, healthInformation, coordinateInformation}) => {

    if (coordinateInformation) {
        if (id === '-200')
            return (
                <Marker
                    icon={userIcon}
                    position={[coordinateInformation.xCoordinate, coordinateInformation.yCoordinate]}>
                    <Popup>
                        <H4>Cześć, to Ty !</H4>
                    </Popup>
                </Marker>
            )
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
    const [filters, setFilters] = useState(false);

    const intervalRef = React.useRef({interval: null, isCancel: false});


    useEffect(() => {
        const getFromApi = async () => {
            try {
                const diseases = await getAllDiseases();
                const unique = new Set();
                diseases.forEach(ob => unique.add(ob.type));
                if (!intervalRef.current.isCancel) {
                    setData((data) => ({...data, diseases: Array.from(unique)}))
                }
            } catch (e) {
                console.log(e);
            }
        }
        getFromApi();

        intervalRef.current.interval = startInterval();

        return () => {
            intervalRef.current.isCancel = true;
            clearInterval(intervalRef.current.interval);
            intervalRef.current = null;
        }
    }, []);

    const startInterval = () => {
        return setInterval(async () => {
            try {
                const diseasesCoord = await getAllDiseasesCoordinates();
                if (!intervalRef.current.isCancel) {
                    setData((data) => ({...data, diseasesLocation: diseasesCoord}));
                }
            } catch (e) {
                console.log(e);
            }
        }, 1000);
    }

    const goFilter = (value) => {
        intervalRef.current.isCancel = true;
        clearInterval(intervalRef.current.interval);
        setData({...data, diseasesLocation: value})
        setFilters(true);
    }

    const clearFilters = () => {
        setFilters(false);
        intervalRef.current.isCancel = false;
        intervalRef.current.interval = startInterval();
    }


    const position = [data.lat, data.lng];
    const {diseasesLocation} = data;
    return (
        <MapContainer>
            <FilterDiv>

                <Row className='p-1'>
                    {filters &&
                    <Button onClick={clearFilters} className='ml-2' variant='outline-danger'>Usuń filtry</Button>}
                    {!filters &&
                    <>
                        <TypeFilter goFilter={goFilter} diseases={data.diseases} diseasesLocation={diseasesLocation}/>
                        <HelpFilter goFilter={goFilter} diseasesLocation={diseasesLocation}/>
                        <SimpleInput goFilter={goFilter} diseasesLocation={diseasesLocation}/>
                    </>}

                </Row>


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
                            id={person._id}
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

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  border-color: red;
  display: inline;
`;

const FilterDiv = styled.div`

`;
