import request from 'utils/request';
import * as r from 'redux-saga/effects';
import * as a from '../actions';
import * as c from '../constants';

export function* fetchVaults() {
  try {
    const url = `https://api.yearn.tools/vaults?apy=true`;
    const vaults = yield r.call(request, url);
    yield r.put(a.vaultsLoaded(vaults));
  } catch (err) {
    console.log('Error reading vaults', err);
  }
}

export default function* initialize() {
  yield r.takeLatest(c.CONNECTION_CONNECTED, fetchVaults);
}
