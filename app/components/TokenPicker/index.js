import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TokenPickerModal from 'components/TokenPickerModal';
import TokenIconAndName from 'components/TokenIconAndName';
import { balanceTransform } from 'utils/string';
import { useSelector, useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';
import * as s from 'containers/App/selectors';
import * as a from 'containers/App/actions';

const Input = styled.input`
  width: 220px;
  padding-left: 10px;
  margin: 10px auto;
  height: 43px;
  margin-bottom: 0px;
  font-size: 20px;
`;

const AmountButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  width: 100%;
`;

const AmountButton = styled.button`
  background-color: transparent;
  border: 0px;
  color: rgb(47, 128, 237);
  padding: 0px;
`;

const Amounts = styled.div`
  display: table;
  margin: 0 auto;
`;

const Balance = styled.div`
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default function(props) {
  const { deposit, selectedToken: selectedTokenOriginal } = props;
  const [showTokenPickerModal, setShowTokenPickerModal] = useState(false);
  const openTokenPickerModal = () => setShowTokenPickerModal(true);
  const closeTokenPickerModal = () => setShowTokenPickerModal(false);
  const dispatch = useDispatch();
  const selectedVault = useSelector(s.selectSelectedVault());

  const depositAmountNormalized = useSelector(
    s.select('depositAmountNormalized'),
  );
  const withdrawalAmountNormalized = useSelector(
    s.select('withdrawalAmountNormalized'),
  );

  let selectedToken;
  let amount;
  if (deposit) {
    selectedToken = selectedTokenOriginal;
    amount = depositAmountNormalized || '0.00';
  } else {
    selectedToken = selectedVault;
    amount = withdrawalAmountNormalized || '0.00';
  }
  // const updateDepositAmount = () => {
  //   console.log('upd');
  //   if (deposit) {
  //     // setAmount(depositAmountNormalized);
  //   }
  // };
  // const updateWithdrawalAmount = () => {
  //   console.log('zog');
  //   if (!deposit) {
  //     setAmount();
  //   }
  // };
  // useEffect(updateDepositAmount, [withdrawalAmount]);
  // useEffect(updateWithdrawalAmount, [depositAmount]);
  const { symbol, balance, balanceNormalized, decimals } = selectedToken;

  const clickToken = () => {
    if (deposit) {
      openTokenPickerModal();
    }
  };

  let truncatedBalance;
  if (balance) {
    truncatedBalance = `${balanceTransform(balance, decimals, 4)} ${symbol}`;
  } else {
    truncatedBalance = `0.0 ${symbol}`;
  }

  const setAmountWithPercent = percentage => {
    if (!balance) {
      dispatch(a.setDepositAmount('0.00'));
      return;
    }
    const newAmountNormalized = new BigNumber(balanceNormalized)
      .times(percentage)
      .toFixed();

    if (deposit) {
      dispatch(a.setDepositAmount(newAmountNormalized));
    } else {
      dispatch(a.setWithdrawalAmount(newAmountNormalized));
    }
  };

  const setAmountAndDispatch = newAmountNormalized => {
    if (deposit) {
      dispatch(a.setDepositAmount(newAmountNormalized));
    } else {
      dispatch(a.setWithdrawalAmount(newAmountNormalized));
    }
  };

  return (
    <Wrapper>
      <TokenIconAndName
        deposit={deposit}
        token={selectedToken}
        onClick={clickToken}
      />
      <Amounts>
        <Balance>
          <b>Balance:</b> {truncatedBalance}
        </Balance>
        <Input
          placeholder="0.00"
          value={amount}
          type="text"
          onChange={evt => setAmountAndDispatch(evt.target.value)}
        />
        <AmountButtons>
          <AmountButton onClick={() => setAmountWithPercent(0)}>
            0%
          </AmountButton>
          <AmountButton onClick={() => setAmountWithPercent(0.25)}>
            25%
          </AmountButton>
          <AmountButton onClick={() => setAmountWithPercent(0.5)}>
            50%
          </AmountButton>
          <AmountButton onClick={() => setAmountWithPercent(1)}>
            100%
          </AmountButton>
        </AmountButtons>
      </Amounts>

      <TokenPickerModal
        onHide={closeTokenPickerModal}
        show={showTokenPickerModal}
      />
    </Wrapper>
  );
}
