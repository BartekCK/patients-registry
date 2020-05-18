import { Dropdown } from 'react-bootstrap';
import * as React from 'react';

export const HelpFilter = ({ goFilter, diseasesLocation }) => {
  const setFilter = () => {
    const temp = diseasesLocation.filter((ob) => {
      if (ob.coordinateInformation)
        return ob.coordinateInformation.helpMe === true;
      return null;
    });
    goFilter(temp);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle style={{ width: '200px' }}>
        Potrzebujący pomocy
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={setFilter}>Tak</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
