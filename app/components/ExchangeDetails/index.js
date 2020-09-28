import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import TokenPicker from 'components/TokenPicker';
import { useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  background-color: #eef3f7;
  width: 100%;
  padding: 16px 39px;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  width: 100%;
`;

const Tr = styled.tr`
  ${Td} {
    border-bottom: 1px solid #ddd;
    &:last-of-type {
      border-bottom: 0px;
    }
  }
`;

const Td = styled.td`
  &:first-of-type {
    color: #657795;
    font-weight: bold;
  }
  padding: 10px 0px;
  &:last-of-type {
    color: #000;
    text-align: right;
  }
`;

export default function() {
  return (
    <Wrapper>
      <Table>
        <tbody>
          <Tr>
            <Td>Transaction Value</Td>
            <Td>
              <b>$23,123.05</b>
            </Td>
          </Tr>
          <Tr>
            <Td>Exchange Rate</Td>
            <Td>1 ETH = 1.434 DAI</Td>
          </Tr>
          <Tr>
            <Td>Slippage Tolergance </Td>
            <Td>3%</Td>
          </Tr>
          <Tr>
            <Td>Transaction Speed </Td>
            <Td>Fast</Td>
          </Tr>
          <Tr>
            <Td>Exchange Route </Td>
            <Td>Zapper</Td>
          </Tr>
        </tbody>
      </Table>
    </Wrapper>
  );
}
