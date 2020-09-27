import request from 'utils/request';
import * as r from 'redux-saga/effects';
import * as a from '../actions';
import * as c from '../constants';
import * as s from '../selectors';

export function* setDepositAmount(action) {
  const { amount } = action;
  console.log('did set', action.amount);
}

export function* setWithdrawalAmount(action) {
  const { amount } = action;
  console.log('did set');
}

export function* setVault(action) {
  const { vault } = action;
}

export function* setToken(action) {
  const { token } = action;
  yield getCurrentExchangeRate();
}

export function* getCurrentExchangeRate() {
  const selectedToken = yield r.select(s.selectSelectedToken());
  const selectedVault = yield r.select(s.selectSelectedVault());
  yield r.put(a.updatePrices([selectedToken, selectedVault]));
}

export default function* initialize() {
  yield r.takeLatest(c.SET_DEPOSIT_AMOUNT, setDepositAmount);
  yield r.takeLatest(c.SET_WITHDRAWAL_AMOUNT, setWithdrawalAmount);
  yield r.takeLatest(c.SET_VAULT, setVault);
  yield r.takeLatest(c.SET_TOKEN, setToken);
}
