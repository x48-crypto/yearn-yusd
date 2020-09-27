import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';
import BigNumber from 'bignumber.js';
import { currencyTransform } from 'utils/string';

import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Totals = styled.div`
  margin-top: 10px;
`;

const Header = styled.div``;

const EarningsLabel = styled.div`
  color: 0;
  font-size: 30px;
  font-weight: bold;
`;

const EarningsText = styled.div`
  font-weight: bold;
  font-size: 73px;
  line-height: 73px;
  margin-bottom: 10px;
`;

const Earnings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Disclaimer = styled.div`
  text-align: center;
`;

export default function() {
  const aggregateApy = 20;
  const totalDepositedAmountUsd = 3000;
  const futureEarningsPerHour = 1;
  const nbrSecondsInHour = 3600;
  const totalVaultEarningsUsd = 0;
  const futureAmount = 0.0;
  return (
    <Wrapper>
      <Earnings>
        <EarningsLabel>YOUR EARNINGS</EarningsLabel>
        <EarningsText>
          $
          <CountUp
            start={totalVaultEarningsUsd}
            end={futureAmount}
            duration={nbrSecondsInHour}
            separator=","
            useEasing={false}
            decimals={8}
          />
        </EarningsText>
        <Disclaimer>
          Earning <b>{aggregateApy.toFixed(2)}% APR </b> on{' '}
          <b>{currencyTransform(parseFloat(totalDepositedAmountUsd))}</b>
        </Disclaimer>
      </Earnings>
    </Wrapper>
  );
}
