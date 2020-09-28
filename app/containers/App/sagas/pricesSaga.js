import request from 'utils/request';
import BigNumber from 'bignumber.js';
import * as r from 'redux-saga/effects';
import * as s from '../selectors';
import * as a from '../actions';
import * as c from '../constants';

function* injectPrice(token, prices) {
  const tokens = yield r.select(s.select('tokens'));
  let priceUsd = _.get(prices, `${token.address}.usd`);
  const fullToken = _.find(tokens, { address: token.address });
  const tokenIsEthereum = token.address === 'ethereum';
  if (tokenIsEthereum) {
    const ethPriceUrl =
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    const ethPriceResp = yield r.call(request, ethPriceUrl);
    priceUsd = ethPriceResp.ethereum.usd;
  }
  const { balanceNormalized } = fullToken;
  let balanceUsd;
  if (balanceNormalized && priceUsd) {
    balanceUsd = new BigNumber(balanceNormalized).times(priceUsd).toNumber();
  }
  return { ...fullToken, priceUsd, balanceUsd, address: token.address };
}

export function* updatePrices(action) {
  const tokensToUpdate = action.tokens;
  try {
    const tokenAddresses = _.map(tokensToUpdate, token => token.address);
    const pricesUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses},0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8&vs_currencies=usd`;
    const prices = yield r.call(request, pricesUrl);
    const tokensWithPrice = yield r.all(
      _.map(tokensToUpdate, token => injectPrice(token, prices), []),
    );
    yield r.put(a.pricesLoaded(tokensWithPrice));
  } catch (err) {
    console.log('Error reading prices', err);
  }
}

export function* startLoadingPrices() {
  yield r.put(a.startLoadingPrices());
}

export function* updateBalancePrices() {
  console.log('get ballp');
  const userTokens = yield r.select(s.select('userTokens'));
  yield r.put(a.updatePrices(userTokens));
}

export default function* initialize() {
  yield r.takeLatest(c.TOKEN_BALANCES_LOADED, updateBalancePrices);
  yield r.takeLatest(c.UPDATE_PRICES, updatePrices);
}
