import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import TokenPicker from 'components/TokenPicker';
import { useSelector } from 'react-redux';
import ExchangeDetails from 'components/ExchangeDetails';
import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  display: flex;
  width: 755px;
  flex-direction: column;
`;

const Left = styled.div``;
const Right = styled.div``;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  width: 135px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 280px;
  align-items: center;
  margin-top: 40px;
  width: 100%;
`;

export default function() {
  const selectedToken = useSelector(s.selectSelectedToken());
  return (
    <Wrapper>
      <Top>
        <Left>
          <TokenPicker deposit selectedToken={selectedToken} />
        </Left>
        <Middle>
          <Button>Deposit</Button>
          <Button>Withdraw</Button>
        </Middle>
        <Right>
          <TokenPicker token={selectedToken} />
        </Right>
      </Top>
      <ExchangeDetails />
    </Wrapper>
  );
}
