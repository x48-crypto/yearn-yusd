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

const Header = styled.div`
  margin-bottom: 20px;
`;

export default function() {
  return (
    <Wrapper>
      <Header>Deposit and earn. Simple.</Header>
      <EarningsCounter />
      <Exchange />
    </Wrapper>
  );
}
