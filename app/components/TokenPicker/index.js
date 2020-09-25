import React from 'react';
import styled from 'styled-components';
import ValueWithLabel from 'components/ValueWithLabel';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default function() {
  return (
    <Wrapper>
      <ValueWithLabel value="💜" label="ETH" />
    </Wrapper>
  );
}
