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
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses}&vs_currencies=usd`;
    const prices = yield r.call(request, url);
    const tokensWithPrice = _.map(
      tokens,
      token => injectPrice(token, prices),
      [],
    );
    const selectedToken = yield r.select(s.select('selectedToken'));
    if (!selectedToken) {
      const balanceUsdSort = token => token.balanceUsd || 0;
      const largestBalance = _.first(
        _.orderBy(tokensWithPrice, [balanceUsdSort], ['desc']),
      );
      const largestBalanceToken = _.find(
        tokens,
        token =>
          token.address.toLowerCase() === largestBalance.address.toLowerCase(),
      );

      yield r.put(a.selectToken(largestBalanceToken));
    }
    yield r.put(a.pricesLoaded(tokensWithPrice));
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
