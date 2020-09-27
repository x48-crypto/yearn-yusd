import React, { useState } from 'react';
import styled from 'styled-components';
import TokenPickerModal from 'components/TokenPickerModal';
import TokenIconAndName from 'components/TokenIconAndName';
import { balanceTransform } from 'utils/string';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';

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
  justify-content: space-between;
  align-items: center;
  width: 350px;
`;

export default function(props) {
  const { immutable, selectedToken } = props;
  const [showTokenPickerModal, setShowTokenPickerModal] = useState(false);
  const openTokenPickerModal = () => setShowTokenPickerModal(true);
  const closeTokenPickerModal = () => setShowTokenPickerModal(false);

  const selectedVault = useSelector(s.select('selectedVault'));
  const loadingBalances = useSelector(s.select('loading')).balances;

  let newSelectedToken = selectedToken;
  if (immutable) {
    newSelectedToken = {
      address: '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c',
      ...selectedVault,
      symbol: 'yUSD',
    };
  }
  const { symbol } = newSelectedToken;

  const clickToken = () => {
    if (!immutable) {
      openTokenPickerModal();
    }
  };

  let truncatedBalance;
  const { balance } = newSelectedToken;
  if (loadingBalances) {
    truncatedBalance = 'Loading...';
  } else if (balance) {
    truncatedBalance = `${balanceTransform(
      balance,
      newSelectedToken.decimals,
      4,
    )} ${symbol}`;
  } else {
    truncatedBalance = `0.00 ${symbol}`;
  }

  const setAmount = percentage => {
    if (immutable) {
      console.log('withdraw');
      return;
    }
    console.log('dep');
    console.log('prer', percentage);
  };

  return (
    <Wrapper>
      <TokenIconAndName
        immutable={immutable}
        token={newSelectedToken}
        onClick={clickToken}
      />
      <Amounts>
        <Balance>
          <b>Balance:</b> {truncatedBalance}
        </Balance>
        <Input placeholder="0.00" />
        <AmountButtons>
          <AmountButton onClick={() => setAmount(0)}>0%</AmountButton>
          <AmountButton onClick={() => setAmount(0.25)}>25%</AmountButton>
          <AmountButton onClick={() => setAmount(0.75)}>50%</AmountButton>
          <AmountButton onClick={() => setAmount(1)}>100%</AmountButton>
        </AmountButtons>
      </Amounts>

      <TokenPickerModal
        onHide={closeTokenPickerModal}
        show={showTokenPickerModal}
      />
    </Wrapper>
  );
}
