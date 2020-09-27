import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import * as a from 'containers/App/actions';

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function ConnectButton() {
  const dispatch = useDispatch();

  const connect = () => {
    dispatch(a.showConnectorModal(true));
  };

  return (
    <ButtonWrap>
      <Button type="button" onClick={connect}>
        Connect Wallet
      </Button>
    </ButtonWrap>
  );
}
