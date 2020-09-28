import erc20Abi from 'abi/erc20.json';
import vaultAbi from 'abi/vaultV4.json';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import * as r from 'redux-saga/effects';
import * as s from '../selectors';
import * as a from '../actions';
import * as c from '../constants';

const pollPeriod = 30000;

function readContract(contract, methodName) {
  return contract.methods[methodName]().call();
}

function readBalanceFromContract(contract, account) {
  return contract.methods.balanceOf(account).call();
}

function* getEthBalance(library, account) {
  return yield library.getBalance(account);
}

const ethAddress = 'ethereum';

function* fetchAccountBalance(token, web3, account, library) {
  const { address } = token;
  let balance;
  let balanceNormalized;
  let name;
  let symbol;
  let decimals;
  const tokenIsVault = token.vault;
  if (tokenIsVault) {
    const vaultContract = new web3.eth.Contract(vaultAbi, address);
    let shares;
    try {
      balance = yield vaultContract.methods.balanceOf(account).call();
      const pricePerFullShare = yield vaultContract.methods
        .getPricePerFullShare()
        .call();
      const priceRatio = new BigNumber(pricePerFullShare)
        .dividedBy(10 ** 18)
        .toFixed();
      shares = new BigNumber(balance).times(priceRatio).toFixed();
      balanceNormalized = new BigNumber(balance).dividedBy(10 ** 18).toFixed();
    } catch (err) {
      console.log('Err reading vault balance: ', err);
    }
    return { ...token, balance, shares, balanceNormalized };
  }
  if (address === ethAddress) {
    try {
      balance = new BigNumber(yield getEthBalance(library, account)).toFixed();
      balanceNormalized = new BigNumber(balance).dividedBy(10 ** 18).toFixed();
    } catch (err) {
      console.log('Err reading eth balance: ', err);
    }
    return { ...token, balance, balanceNormalized };
  }
  try {
    const contract = new web3.eth.Contract(erc20Abi, address);
    balance = yield readBalanceFromContract(contract, account);
    name = yield readContract(contract, 'name');
    symbol = yield readContract(contract, 'symbol');
    decimals = yield readContract(contract, 'decimals');
    balanceNormalized = new BigNumber(balance)
      .dividedBy(10 ** decimals)
      .toString();
    if (balance * 1 === 0) {
      balance = undefined;
      balanceNormalized = undefined;
    }
  } catch (err) {
    console.log('Err reading token balance:', token, err);
  }
  return {
    ...token,
    balance,
    name,
    balanceNormalized,
    symbol,
    decimals,
    address,
  };
}

export function* fetchAccountBalances() {
  const account = yield r.select(s.select('account'));
  const userTokens = yield r.select(s.select('userTokens'));
  const library = yield r.select(s.select('library'));
  const web3 = new Web3(library.provider);
  const balances = yield r.all(
    userTokens.map(token =>
      r.call(fetchAccountBalance, token, web3, account, library),
    ),
  );
  return balances;
}

export function* readBalances() {
  try {
    const balances = yield fetchAccountBalances();
    const yUsdVault = _.find(balances, {
      address: '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c'.toLowerCase(),
    });
    const selectedToken = yield r.select(s.selectSelectedToken());
    const newSelectedToken = _.find(balances, {
      address: selectedToken.address,
    });
    if (newSelectedToken) {
      yield r.put(a.setToken(newSelectedToken));
    }
    yield r.put(a.setVault(yUsdVault));
    yield r.put(a.tokenBalancesLoaded(balances));
  } catch (err) {
    console.log('Error reading balances', err);
  }
  yield r.delay(pollPeriod);
}

export default function* initialize() {
  yield r.takeLatest(c.USER_TOKENS_LOADED, readBalances);
}
