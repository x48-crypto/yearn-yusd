import request from 'utils/request';
import * as r from 'redux-saga/effects';
import * as a from '../actions';
import * as c from '../constants';
import * as s from '../selectors';

export function* fetchVaults() {
  try {
    const account = yield r.select(s.select('account'));
    const url = `https://api.yearn.tools/user/${account}/vaults?apy=true&showall=true&statistics=true`;
    const vaults = yield r.call(request, url);
    yield r.put(a.vaultsLoaded(vaults));
  } catch (err) {
    console.log('Error reading vaults', err);
  }
}

export default function* initialize() {
  yield r.takeLatest(c.CONNECTION_CONNECTED, fetchVaults);
}
