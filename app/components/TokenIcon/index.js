import React from 'react';
import Web3 from 'web3';
import ReactImageFallback from 'react-image-fallback';
import ThinkingIcon from 'images/thinkingIcon.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 30px;
  min-height: 30px;
  width: 30px;
  height: 30px;
`;

const imageStyles = `
  width: 100%;
  height: 100%;
`;

export default function TokenIcon(props) {
  const { address, className } = props;
  const tokenAddressChecksum = Web3.utils.toChecksumAddress(address);
  const imageUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddressChecksum}/logo.png`;

  return (
    <Wrapper className={className}>
      <ReactImageFallback
        className={className}
        css={imageStyles}
        src={imageUrl}
        fallbackImage={ThinkingIcon}
      />
    </Wrapper>
  );
}
