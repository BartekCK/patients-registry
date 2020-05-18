import React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

export const SimpleInput = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
}) => (
  <FormGroup>
    <FormLabel>{label}</FormLabel>
    <FormControl type={type} name={name} value={value} onChange={onChange} />
  </FormGroup>
);
