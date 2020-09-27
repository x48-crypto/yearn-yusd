import * as r from 'redux-saga/effects';
import * as c from '../constants';

export function* setSelectedToken(action) {
  localStorage.setItem('selectedToken', JSON.stringify(action.token));
}

export default function* initialize() {
  yield r.takeLatest(c.SELECT_TOKEN, setSelectedToken);
}
