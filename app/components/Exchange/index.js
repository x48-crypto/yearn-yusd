import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import TokenPicker from 'components/TokenPicker';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 280px;
  align-items: center;
  margin-top: 40px;
`;

const Left = styled.div``;
const Right = styled.div``;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function() {
  const selectedToken = useSelector(s.selectSelectedToken());
  return (
    <Wrapper>
      <Left>
        <TokenPicker selectedToken={selectedToken} />
      </Left>
      <Middle>
        <Button>Deposit</Button>
        <Button>Withdraw</Button>
      </Middle>
      <Right>
        <TokenPicker immutable token={selectedToken} />
      </Right>
    </Wrapper>
  );
}
