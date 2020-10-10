import * as r from 'redux-saga/effects';
import * as a from '../actions';
import * as c from '../constants';

export function* runConfettiStop() {
  yield r.delay(3000);
  yield r.put(a.runConfettiStop());
}

export default function* initialize() {
  yield r.takeLatest(c.RUN_CONFETTI_START, runConfettiStop);
}
