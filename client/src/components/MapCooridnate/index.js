import * as React from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet'
import axios from "axios";
import {ConfigApi} from "../../helpers/routes";
import styled from "styled-components";

const myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII',
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
        this.interval = setInterval(async () => await this.updateMap(), 1000);
        await axios.get('https://gps-server.now.sh/diseases')
            .then(response => {
                response.data.forEach(ob => unique.add(ob.type));
            })
            .catch(err => console.log(err));
        this.setState({diseases: Array.from(unique)});
    };

    componentWillUnmount = () => {
        console.log('Delete timer');
        clearInterval(this.interval);
    };

    updateMap = async () => {
        console.log('Coordinates update');
        const response = await axios.get('https://gps-server.now.sh/users/coordinates/all', ConfigApi);
        this.setState({diseasesLocation: response.data});
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