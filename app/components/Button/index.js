import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  width: 150px;
  margin: 10px;
  padding: 5px;
  background-color: transparent;
  text-transform: uppercase;
  border-radius: 50px;
  padding: 10px 24px;
  border: 2px solid rgba(47, 128, 237, 0.7);
  color: rgba(47, 128, 237, 0.7);
  &:focus {
    outline: 0 !important;
  }
`;

export default function ConnectButton(props) {
  return <Wrapper type="button">{props.children}</Wrapper>;
}
