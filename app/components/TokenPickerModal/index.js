import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import TokenTable from 'components/TokenTable';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';
import SearchIcon from '../../images/searchIcon.svg';

const SelectToken = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const FilterToken = styled.input`
  width: 100%;
  background-color: #f0f5f9;
  color: #002237;
  border: 2px solid #f0f5f9;
  height: 40px;
  transition: 0.3s;
  padding: 12px 16px 12px 48px;
  margin-top: 24px;
  outline: 0;
  margin-bottom: 24px;
  border-radius: 4px;
  &:focus {
    border: 2px solid #2f80ed;
  }
`;

const Input = styled.div`
  position: relative;
`;

const SearchIconImg = styled.img``;

const SearchIconWrapper = styled.div`
  position: absolute;
  margin-top: 24px;
  margin-left: 12px;
  color: rgb(101, 119, 149);
  height: 40px;
  display: flex;
  align-items: center;
`;

const Top = styled.div`
  margin: 16px 0px;
`;

export default function ConnectModal(props) {
  const { show, onHide } = props;
  const [filter, setFilter] = useState('');
  const tokens = useSelector(s.select('tokens'));
  const removeVaults = token => !token.vault;
  const filterTokens = token =>
    token.symbol.toLowerCase().startsWith(filter.toLowerCase());

  const filteredTokens = _.chain(tokens)
    .filter(removeVaults)
    .filter(filterTokens)
    .value();

  const wrappedHide = () => {
    setFilter('');
    onHide();
  };

  return (
    <Modal
      dialogClassName="tokenPickerModal"
      show={show}
      onHide={wrappedHide}
      centered
      animation={false}
    >
      <Modal.Body>
        <Top>
          <SelectToken>Select a token</SelectToken>
          <Input onChange={e => setFilter(e.target.value)}>
            <SearchIconWrapper>
              <SearchIconImg src={SearchIcon} />
            </SearchIconWrapper>
            <FilterToken placeholder="Filter by token" />
          </Input>
        </Top>
        <TokenTable tokens={filteredTokens} onHide={wrappedHide} />
      </Modal.Body>
    </Modal>
  );
}
