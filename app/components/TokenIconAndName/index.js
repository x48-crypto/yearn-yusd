import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as s from 'containers/App/selectors';
import styled from 'styled-components';
import DropdownIcon from '../../images/dropdownIcon.svg';
import TokenIcon from 'components/TokenIcon';

const Wrapper = styled.div`
  font-weight: bold;
  text-align: center;
  &:hover {
    background-color: #f0f5f9;
  }
  font-size: 24px;
  line-height: 24px;
  width: 200px;
  padding: 20px 0px;
  transition: 0.3s;
`;

const Dropdown = styled.div`
  position: absolute;
  right: -30px;
  top: -2px;
  display: inline;
`;

const StyledTokenIcon = styled(TokenIcon)`
  min-width: 73px;
  min-height: 73px;
  margin: 0 auto;
`;

const LabelWrapper = styled.div`
  position: relative;
  display: table;
  margin: 0 auto;
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

export default function Pair(props) {
  const { onClick } = props;
  const selectedToken = useSelector(s.select('selectedToken'));
  const symbol = _.get(selectedToken, 'symbol');
  const address = _.get(selectedToken, 'address');
  return (
    <Wrapper onClick={onClick}>
      <Label>
        <LabelWrapper>
          {symbol}
          <Dropdown>
            <img alt="Dropdown" src={DropdownIcon} />
          </Dropdown>
        </LabelWrapper>
      </Label>
      <Value>
        <StyledTokenIcon address={address} />
      </Value>
    </Wrapper>
  );
}
