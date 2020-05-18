import React from 'react';
import styled from 'styled-components';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export const ShowInput = styled.input`
  width: 80%;
  height: 40px;
  background-color: transparent;
  border: 3px solid #0ac986;
  border-radius: 2px;
  color: white;
  font-size: 1em;
  padding: 0;
`;

const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
`;

export const AddInput = (props) => {
  const destroy = () => {
    props.delete(props.id);
  };

  return (
    <Container>
      <InputGroup>
        <FormControl value={props.kind} disabled={true} />
        <InputGroup.Append>
          <Button variant='danger' onClick={destroy}>
            -
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  );
};
