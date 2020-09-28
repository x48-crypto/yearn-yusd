import BigNumber from 'bignumber.js';
import * as r from 'redux-saga/effects';
import * as a from '../actions';
import * as c from '../constants';
import * as s from '../selectors';

export function* setDepositAmount(action) {
  const { amount } = action;
  // const exchangeRate = yield r.select(s.select('exchangeRate'));
  // const newWithdrawalAmount = new BigNumber(amount).dividedBy(exchangeRate).toFixed();

  //  console.log('did setdep', action.amount, exchangeRate);
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

/**
 * Prices loaded, Update exchange rate.
 */
export function* pricesLoaded(action) {
  const { prices } = action;
  const selectedToken = yield r.select(s.selectSelectedToken());
  const selectedVault = yield r.select(s.selectSelectedVault());
  const selectedTokenPrice = _.find(prices, { address: selectedToken.address })
    .priceUsd;
  const selectedVaultPrice = _.find(prices, { address: selectedVault.address })
    .priceUsd;

  // Update token pair exchange rate
  if (selectedTokenPrice && selectedVaultPrice) {
    const ratio = new BigNumber(selectedTokenPrice)
      .dividedBy(selectedVaultPrice)
      .toFixed();
    yield r.put(a.setExchangeRate(ratio));
  }
}

export default function* initialize() {
  yield r.takeLatest(c.SET_DEPOSIT_AMOUNT, setDepositAmount);
  yield r.takeLatest(c.SET_WITHDRAWAL_AMOUNT, setWithdrawalAmount);
  yield r.takeLatest(c.SET_VAULT, setVault);
  yield r.takeLatest(c.SET_TOKEN, setToken);
  yield r.takeLatest(c.PRICES_LOADED, pricesLoaded);
}
