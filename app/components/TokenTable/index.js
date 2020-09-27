import React from 'react';
import styled from 'styled-components';
import { balanceTransform } from 'utils/string';
import TokenIcon from 'components/TokenIcon';
import Infinite from 'react-infinite';
import { useDispatch } from 'react-redux';
import * as a from 'containers/App/actions';

const Row = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  &:hover {
    background-color: #f0f5f9;
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #002237;
  &:last-child {
    text-align: right;
    padding-right: 26px;
  }
  &:first-of-type {
    width: 80%;
    padding-left: 16px;
  }
  &:last-of-type {
    width: 20%;
  }
`;

const Column = styled.div`
  &:first-of-type {
    width: 80%;
  }
  &:last-of-type {
    width: 20%;
  }
  &:last-child {
    text-align: right;
  }
  display: flex;
  align-items: center;
`;

const Balance = styled.div`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TokenSymbol = styled.div`
  margin-left: 10px;
`;

const NoTokens = styled.div`
  display: table;
  margin: 40px auto;
  font-size: 22px;
  text-align: center;
`;

const NoTokensIcon = styled.span`
  font-size: 51px;
`;

export default function(props) {
  const { tokens, onHide } = props;
  const dispatch = useDispatch();
  const renderToken = token => {
    const balance =
      token.balance && balanceTransform(token.balance, token.decimals);
    const selectToken = () => {
      dispatch(a.selectToken(token));
      onHide();
    };
    return (
      <Row key={token.address} onClick={selectToken}>
        <Column title={token.address}>
          <TokenIcon address={token.address} />
          <TokenSymbol>{token.symbol}</TokenSymbol>
        </Column>
        <Column>
          <Balance title={balance}>{balance}</Balance>
        </Column>
      </Row>
    );
  };
  const tokenEls = _.map(tokens, renderToken);

  const noTokens = _.size(tokens) === 0;

  let content;
  if (noTokens) {
    content = (
      <NoTokens>
        <div>No tokens found</div>
        <NoTokensIcon role="img" aria-label="sad">
          😭
        </NoTokensIcon>
      </NoTokens>
    );
  } else {
    content = (
      <React.Fragment>
        <Column>
          <Header>Token</Header>
          <Header>Balance</Header>
        </Column>
        <Infinite containerHeight={460} elementHeight={62}>
          {tokenEls}
        </Infinite>
      </React.Fragment>
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
}
