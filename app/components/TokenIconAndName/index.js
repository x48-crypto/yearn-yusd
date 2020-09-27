import React from 'react';
import styled from 'styled-components';
import TokenIcon from 'components/TokenIcon';
import DropdownIcon from '../../images/dropdownIcon.svg';

const Wrapper = styled.div`
  font-weight: bold;
  text-align: center;
  &:hover {
    cursor: ${props => (props.immutable ? 'default' : 'pointer')};
    background-color: ${props => (props.immutable ? 'transparent' : '#f0f5f9')};
  }
  font-size: 30px;
  width: 220px;
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
  min-width: 93px;
  min-height: 93px;
  margin: 0 auto;
`;

const LabelWrapper = styled.div`
  position: relative;
  display: table;
  margin: 0 auto;
`;

const Symbol = styled.div`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 130px;
  margin-bottom: 5px;
`;

const Label = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Value = styled.div`
  text-align: center;
  font-size: 70px;
  line-height: 70px;
`;

export default function Component(props) {
  const { onClick, token, immutable } = props;
  const symbol = _.get(token, 'symbol');
  const address = _.get(token, 'address');
  const loading = !symbol;
  let dropdown;
  if (!immutable && !loading) {
    dropdown = (
      <Dropdown>
        <img alt="Dropdown" src={DropdownIcon} />
      </Dropdown>
    );
  }

  return (
    <Wrapper immutable={immutable} onClick={onClick}>
      <Label>
        <LabelWrapper>
          <Symbol>{symbol || 'Loading'}</Symbol>
          {dropdown}
        </LabelWrapper>
      </Label>
      <Value>
        <StyledTokenIcon address={address} />
      </Value>
    </Wrapper>
  );
}
