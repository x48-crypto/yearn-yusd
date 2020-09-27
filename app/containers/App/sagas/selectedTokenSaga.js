import { getVaultWithAlias } from 'utils/vaults';
import * as r from 'redux-saga/effects';
import * as c from '../constants';

export function* setSelectedToken(action) {
  localStorage.setItem('selectedToken', JSON.stringify(action.token));
}

export function* setSelectedVault(action) {
  const { vault } = action;
  const vaultWithAlias = getVaultWithAlias(vault);
  localStorage.setItem('selectedVault', JSON.stringify(vaultWithAlias));
}

export default function* initialize() {
  yield r.takeLatest(c.SET_TOKEN, setSelectedToken);
  yield r.takeLatest(c.SET_VAULT, setSelectedVault);
}
