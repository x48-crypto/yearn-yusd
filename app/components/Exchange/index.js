import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import TokenPicker from 'components/TokenPicker';
import ValueWithLabel from 'components/ValueWithLabel';

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
  const yUsdAddress = '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c';

  return (
    <Wrapper>
      <Left>
        <TokenPicker />
      </Left>
      <Middle>
        <Button>Deposit</Button>
        <Button>Withdraw</Button>
      </Middle>
      <Right>
        <TokenPicker yUsd address={yUsdAddress} />
      </Right>
    </Wrapper>
  );
}
