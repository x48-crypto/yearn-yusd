import React, { useState } from 'react';
import styled from 'styled-components';
import TokenPickerModal from 'components/TokenPickerModal';
import TokenIconAndName from 'components/TokenIconAndName';

const Input = styled.input`
  width: 200px;
  padding-left: 10px;
  margin: 10px auto;
  height: 43px;
  margin-bottom: 0px;
  font-size: 20px;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 350px;
`;

export default function(props) {
  const { yUsd } = props;
  const [showTokenPickerModal, setShowTokenPickerModal] = useState(false);
  const openTokenPickerModal = () => setShowTokenPickerModal(true);
  const closeTokenPickerModal = () => setShowTokenPickerModal(false);

  if (yUsd) {
    // label = 'yUSD';
    // value = (
    //   <Img src="https://assets.coingecko.com/coins/images/12210/large/yUSD.png?1600166557" />
    // );
  }

  const clickToken = () => {
    openTokenPickerModal();
  };

  return (
    <Wrapper>
      <TokenIconAndName onClick={clickToken} />
      <Amounts>
        <Input placeholder="Amount" />
        <AmountUsd>$2,234.53466</AmountUsd>
      </Amounts>

      <TokenPickerModal
        onHide={closeTokenPickerModal}
        show={showTokenPickerModal}
      />
    </Wrapper>
  );
}
