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

const Loading = styled.div`
  font-size: 33px;
  height: 107px;
`;

export default function() {
  const vault = useSelector(s.select('selectedVault'));
  const vaults = useSelector(s.select('vaults'));
  const tokens = useSelector(s.select('tokens'));
  const yUsdAddress = '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c';
  const yCrv = _.find(tokens, {
    address: '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8',
  });
  const vaultMetadata = _.find(vaults, { address: yUsdAddress });
  let vaultDepositedAmountUsd = 0;
  let apy = 0;
  let futureAmountInOneHour = 0;
  let nbrSecondsInHour = 0;
  let currentEarnings = 0;
  const loading = !(vaultMetadata && yCrv && yCrv.priceUsd && vault);
  let counter = <Loading>Loading...</Loading>;
  if (!loading) {
    apy = vaultMetadata.apy.apyOneWeekSample;
    const yCrvPrice = yCrv.priceUsd;
    vaultDepositedAmountUsd = new BigNumber(vault.shares)
      .times(yCrvPrice)
      .dividedBy(10 ** 18)
      .toNumber();
    nbrSecondsInHour = 3600;
    const apyRatePerHour = apy / 100 / 365 / 24;
    const futureEarningsPerHour = vaultDepositedAmountUsd * apyRatePerHour;
    currentEarnings = new BigNumber(vaultMetadata.statistics.earnings)
      .dividedBy(10 ** 18)
      .toNumber();
    futureAmountInOneHour = currentEarnings + futureEarningsPerHour;
    const earnText = vaultDepositedAmountUsd ? 'Earning' : 'Earn';
    counter = (
      <React.Fragment>
        <EarningsText>
          $
          <CountUp
            start={currentEarnings}
            end={futureAmountInOneHour}
            duration={nbrSecondsInHour}
            separator=","
            useEasing={false}
            decimals={8}
          />
        </EarningsText>
        <Disclaimer>
          {earnText} <b>{apy.toFixed(2)}% APR </b> on{' '}
          <b>{currencyTransform(parseFloat(vaultDepositedAmountUsd))}</b>
        </Disclaimer>
      </React.Fragment>
    );
  }
  return (
    <Wrapper>
      <Earnings>
        <EarningsLabel>YOUR EARNINGS</EarningsLabel>
        {counter}
      </Earnings>
    </Wrapper>
  );
}
