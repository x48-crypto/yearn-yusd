import request from 'utils/request';
import * as r from 'redux-saga/effects';
import * as a from '../actions';
import * as c from '../constants';

const tokenListProvider = 'https://tokens.coingecko.com/uniswap/all.json';

export function* getTokenList() {
  try {
    const url = tokenListProvider;
    const response = yield r.call(request, url);
    const tokenList = response.tokens;
    yield r.put(a.tokenListLoaded(tokenList));
  } catch (err) {
    console.log('Error reading tokens list', err);
  }
}

export default function* initialize() {
  yield r.takeLatest(c.FETCH_TOKEN_LIST, getTokenList);
}
