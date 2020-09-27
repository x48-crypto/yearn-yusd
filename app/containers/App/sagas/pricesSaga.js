import request from 'utils/request';
import BigNumber from 'bignumber.js';
import * as r from 'redux-saga/effects';
import * as s from '../selectors';
import * as a from '../actions';
import * as c from '../constants';

export function* getPrices() {
  const userTokens = yield r.select(s.select('userTokens'));
  const tokens = yield r.select(s.select('tokens'));
  const injectPrice = (token, prices) => {
    const priceUsd = _.get(prices, `${token.address}.usd`);
    const { balanceNormalized } = token;
    let balanceUsd;
    if (balanceNormalized && priceUsd) {
      balanceUsd = new BigNumber(balanceNormalized).times(priceUsd).toNumber();
    }
    return { priceUsd, balanceUsd, address: token.address };
  };

  try {
    const tokenAddresses = _.map(userTokens, token => token.address);
    const pricesUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses},0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8&vs_currencies=usd`;
    const ethPriceUrl =
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

    const prices = yield r.call(request, pricesUrl);
    const ethPrice = yield r.call(request, ethPriceUrl);

    const tokensWithPrice = _.map(
      tokens,
      token => injectPrice(token, prices),
      [],
    );
    const ethToken = _.find(tokens, { symbol: 'ETH' });
    const ethTokenWithPrice = injectPrice(ethToken, ethPrice);
    const tokensWithAllPrices = [...tokensWithPrice, ethTokenWithPrice];

    yield r.put(a.pricesLoaded(tokensWithAllPrices));
  } catch (err) {
    console.log('Error reading prices', err);
  }
}

export function* startLoadingPrices() {
  yield r.put(a.startLoadingPrices());
}

export default function* initialize() {
  yield r.takeLatest(c.TOKEN_BALANCES_LOADED, getPrices);
}
