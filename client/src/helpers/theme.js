import styled from 'styled-components';

export const Button = styled.button`
  margin-right: 10px;
  width: 180px;
  height: 30px;
  border: 3px dashed #41ce2a;
  background-color: Transparent;
  font-weight: 400;
  font-size: 20px;
  color: white;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

export const GreenButton = styled.button`
  margin: 10px 0 15px 0;
  background: #0ac986;
  font-size: 16px;
  width: 100%;
  height: 40px;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: #000000;
    background: #fff;
  }
`;
