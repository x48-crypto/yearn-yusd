import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import TokenPicker from 'components/TokenPicker';
import { useSelector, useDispatch } from 'react-redux';
import ExchangeDetails from 'components/ExchangeDetails';
import LoaderImg from 'images/loaderImg.gif';
import * as a from 'containers/App/actions';
import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  display: flex;
  width: 755px;
  flex-direction: column;
  pointer-events: ${props => (props.disabled ? 'none' : 'inherit')};
`;

const Left = styled.div`
  opacity: ${props => (props.disabled ? '.3' : '1')};
`;

const Right = styled.div`
  opacity: ${props => (props.disabled ? '.3' : '1')};
`;

const ExchangeDetailsWrapper = styled.div`
  opacity: ${props => (props.disabled ? '.3' : '1')};
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  width: 135px;
  align-items: center;
`;

const Loader = styled.img`
  width: 80px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 280px;
  align-items: center;
  margin-top: 40px;
  width: 100%;
`;

export default function() {
  const selectedToken = useSelector(s.selectSelectedToken());
  const depositDisabled = useSelector(s.select('depositDisabled'));
  const withdrawalDisabled = useSelector(s.select('withdrawalDisabled'));
  const loadingExchangeRate = useSelector(s.select('loading')).exchangeRate;
  const dispatch = useDispatch();

  const depositHandler = () => {
    dispatch(a.deposit());
  };

  const withdrawHandler = () => {
    dispatch(a.withdraw());
  };

  let buttons;
  if (loadingExchangeRate) {
    buttons = <Loader src={LoaderImg} />;
  } else {
    buttons = (
      <React.Fragment>
        {' '}
        <Button disabled={depositDisabled} onClick={depositHandler}>
          Deposit
        </Button>
        <Button disabled={withdrawalDisabled} onClick={withdrawHandler}>
          Withdraw
        </Button>
      </React.Fragment>
    );
  }
  return (
    <Wrapper disabled={loadingExchangeRate}>
      <Top>
        <Left disabled={loadingExchangeRate}>
          <TokenPicker deposit selectedToken={selectedToken} />
        </Left>
        <Middle>{buttons}</Middle>
        <Right disabled={loadingExchangeRate}>
          <TokenPicker token={selectedToken} />
        </Right>
      </Top>
      <ExchangeDetailsWrapper disabled={loadingExchangeRate}>
        <ExchangeDetails />
      </ExchangeDetailsWrapper>
    </Wrapper>
  );
}
