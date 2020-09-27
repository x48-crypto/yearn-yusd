import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-weight: bold;
  text-align: center;
  width: 350px;
  &:hover {
    background-color: #f0f5f9;
  }
  font-size: ${props => (props.big ? '24px' : '24px')};
`;

const Label = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Value = styled.div`
  text-align: center;
  font-size: 70px;
  line-height: 70px;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 200px;
  padding-left: 10px;
  margin: 20px auto;
  height: 43px;
  margin-bottom: 0px;
  font-size: 20px;
`;

const Amount = styled.div`
  height: 43px;
  margin: 20px;
  margin-bottom: 0px;
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
`;

const AmountUsd = styled.div`
  height: 43px;
  font-size: 20px;
  text-align: start;
`;

const Amounts = styled.div`
  display: table;
  margin: 0 auto;
`;

export default function Pair(props) {
  const { label, big, value, onClick } = props;
  let amount = <Input placeholder="Amount" />;

  return (
    <Wrapper onClick={onClick}>
      <Label big={big}>{label}</Label>
      <Value>{value}</Value>
      <Amounts>
        {amount}
        <AmountUsd>$2,234.53466</AmountUsd>
      </Amounts>
    </Wrapper>
  );
}
