import React from 'react';
import styled from 'styled-components';
import EarningsCounter from 'components/EarningsCounter';
import Exchange from 'components/Exchange';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const PartyWrapper = styled.div`
  font-size: 20px;
`;

const Header = styled.div``;

export default function() {
  return (
    <Wrapper>
      <PartyWrapper>🥳</PartyWrapper>
      <Header>Deposit and earn.</Header>
      <EarningsCounter />
      <Exchange />
    </Wrapper>
  );
}
