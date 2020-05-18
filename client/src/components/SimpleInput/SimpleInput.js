import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";


export const SimpleInput = ({goFilter, diseasesLocation}) => {

    const [value, setValue] = useState('');

    const getPosition = () => {
        const geo = navigator.geolocation;
        geo.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            diseasesLocation.push({_id: '-200', coordinateInformation: {xCoordinate: latitude, yCoordinate: longitude}})
            const temp = diseasesLocation.filter(el => {

                if (el.coordinateInformation) {
                    const {xCoordinate, yCoordinate} = el.coordinateInformation;

                    const dist = distance(latitude, longitude, xCoordinate, yCoordinate, "K");
                    if (dist < Number(value)) {
                        return el;
                    }
                }

                return null;
            })
            goFilter(temp);
        })

    }

    return (
        <InputGroup style={{width: '200px'}}>
            <FormControl value={value} onChange={(e) => setValue(e.target.value)} placeholder='W odległości ... [m]'/>
            <InputGroup.Append>
                <Button onClick={getPosition}>Szukaj</Button>
            </InputGroup.Append>
        </InputGroup>)
}


const distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") {
            dist = dist * 1.609344
        }
        if (unit === "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}
