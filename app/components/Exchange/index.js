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
        <ValueWithLabel value="😍" label="yUSD" />
      </Right>
    </Wrapper>
  );
}
