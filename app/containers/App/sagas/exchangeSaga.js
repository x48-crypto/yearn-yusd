import BigNumber from 'bignumber.js';
import erc20Abi from 'abi/erc20.json';
import * as r from 'redux-saga/effects';
import * as a from '../actions';
import * as c from '../constants';
import * as s from '../selectors';

const zapContractAddress = '0xacdf47c844eff0ecb218d8945e28a9a484af8d07';
const MAX_UINT256 = new BigNumber(2)
  .pow(256)
  .minus(1)
  .toFixed(0);

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

export function* setMaxDeposit(action) {
  const selectedToken = yield r.select(s.selectSelectedToken());
  yield r.put(a.setDepositAmount(selectedToken.balanceNormalized));
}

function* getApprovalForToken() {
  const selectedToken = yield r.select(s.selectSelectedToken());
  const account = yield r.select(s.selectAccount());
  const web3 = yield r.select(s.select('web3'));
  const { address } = selectedToken;
  if (address === 'ethereum') {
    return;
  }
  const tokenContract = new web3.eth.Contract(erc20Abi, address);
  const allowance = yield tokenContract.methods
    .allowance(account, zapContractAddress)
    .call({
      from: account,
    });
  const approved = _.toNumber(allowance) > 0;
  yield r.put(a.selectedTokenApproved(approved));
}

export function* setToken() {
  yield getCurrentExchangeRate();
  yield getApprovalForToken();
}

export function* getCurrentExchangeRate() {
  const selectedToken = yield r.select(s.selectSelectedToken());
  const selectedVault = yield r.select(s.selectSelectedVault());
  yield r.put(a.updatePrices([selectedToken, selectedVault]));
}

// Prices loaded, Update exchange rate.
export function* pricesLoaded(action) {
  const { prices } = action;
  const selectedToken = yield r.select(s.selectSelectedToken());
  const selectedVault = yield r.select(s.selectSelectedVault());

  const tokenPrice = _.find(
    prices,
    token =>
      token.address.toLowerCase() === selectedToken.address.toLowerCase(),
  );
  const vaultPrice = _.find(prices, { address: selectedVault.address });

  // Update token pair exchange rate
  if (tokenPrice && vaultPrice) {
    const selectedTokenPrice = tokenPrice.priceUsd;
    const selectedVaultPrice = vaultPrice.priceUsd;
    const ratio = new BigNumber(selectedTokenPrice)
      .dividedBy(selectedVaultPrice)
      .toFixed();
    yield r.put(a.setExchangeRate(ratio));
  }
}

function* approveToken(token, account, web3) {
  const tokenAddress = token.address;
  const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
  const newToken = token;

  yield tokenContract.methods
    .approve(zapContractAddress, MAX_UINT256)
    .send({
      from: account,
    })
    .on('transactionHash', hash => {
      console.log('got hash', hash);
    })
    .on('receipt', () => {
      console.log('zog');
      newToken.confirmed = true;
    });
}

export function* deposit() {
  const depositAmount = yield r.select(s.select('depositAmount'));
  const selectedToken = yield r.select(s.selectSelectedToken());
  const tokenApproved = yield r.select(s.select('selectedTokenApproved'));
  const account = yield r.select(s.selectAccount());
  const web3 = yield r.select(s.select('web3'));
  if (!tokenApproved) {
    yield approveToken(selectedToken, account, web3);
  }
}

export function* withdraw() {
  console.log('do with');
}

export default function* initialize() {
  yield r.takeLatest(c.SET_DEPOSIT_AMOUNT, setDepositAmount);
  yield r.takeLatest(c.SET_WITHDRAWAL_AMOUNT, setWithdrawalAmount);
  yield r.takeLatest(c.SET_VAULT, setVault);
  yield r.takeLatest(c.SET_TOKEN, setToken);
  yield r.takeLatest(c.DEPOSIT, deposit);
  yield r.takeLatest(c.WITHDRAW, withdraw);
  yield r.takeLatest(c.PRICES_LOADED, pricesLoaded);
  yield r.takeLatest(c.SET_EXCHANGE_RATE, setMaxDeposit);
}
