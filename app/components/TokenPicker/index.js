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
  const [amount, setAmount] = useState('0.00');
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
  let selectedToken = selectedTokenOriginal;
  if (!deposit) {
    selectedToken = selectedVault;
  }
  const updatePrice = () => {
    if (deposit) {
      //    setAmount(depositAmountNormalized);
    } else {
      //  setAmount(withdrawalAmountNormalized);
    }
  };
  useEffect(updatePrice, [depositAmountNormalized, withdrawalAmountNormalized]);
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
    truncatedBalance = `0.00 ${symbol}`;
  }

  const setAmountWithPercent = percentage => {
    if (!balance) {
      return;
    }
    const newAmount = new BigNumber(balance).times(percentage).toFixed(0);
    const newAmountNormalized = new BigNumber(balanceNormalized)
      .times(percentage)
      .toFixed(8);

    setAmount(newAmountNormalized);
    if (deposit) {
      //dispatch(a.setDepositAmount(newAmount));
    } else {
      //dispatch(a.setWithdrawalAmount(newAmount));
    }
  };

  const setAmountAndDispatch = newAmountNormalized => {
    if (!newAmountNormalized) {
      setAmount('');
      return;
    }
    const newAmount = new BigNumber(newAmountNormalized)
      .times(10 ** 18)
      .toFixed(0);
    setAmount(newAmountNormalized);
    if (deposit) {
      //  dispatch(a.setDepositAmount(newAmount));
    } else {
      // dispatch(a.setWithdrawalAmount(newAmount));
    }
    setAmount(newAmountNormalized);
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
