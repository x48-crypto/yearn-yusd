import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.app || initialState;

export const select = key =>
  createSelector(
    selectApp,
    substate => substate[key],
  );

export const selectSelectedToken = () =>
  createSelector(
    selectApp,
    substate =>
      substate.selectedToken ||
      JSON.parse(localStorage.getItem('selectedToken')) || {
        address: 'ethereum',
        symbol: 'ETH',
      },
  );

export const selectSelectedVault = () =>
  createSelector(
    selectApp,
    substate =>
      substate.selectedVault ||
      JSON.parse(localStorage.getItem('selectedVault')) || {
        address: '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c',
        symbol: 'yUSD',
      },
  );

export const selectAccount = () =>
  createSelector(
    selectApp,
    substate => substate.account,
  );

export const selectLoading = () =>
  createSelector(
    selectApp,
    substate => substate.loading,
  );

export const selectConnected = () =>
  createSelector(
    selectApp,
    substate => substate.connected,
  );

export const selectShowConnectorModal = () =>
  createSelector(
    selectApp,
    substate => substate.showConnectorModal,
  );

export const selectVaults = () =>
  createSelector(
    selectApp,
    substate => substate.vaults,
  );
