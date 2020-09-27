import * as c from './constants';

export function connectionConnected(account, connector, library, chainId) {
  return {
    type: c.CONNECTION_CONNECTED,
    account,
    connector,
    library,
    chainId,
  };
}

export function connectionUpdated(library, chainId, active) {
  return {
    type: c.CONNECTION_UPDATED,
    library,
    chainId,
    active,
  };
}

export function startLoadingUserTokens() {
  return {
    type: c.START_LOADING_USER_TOKENS,
  };
}

export function userTokensLoaded(tokens) {
  return {
    type: c.USER_TOKENS_LOADED,
    tokens,
  };
}

export function tokenBalancesLoaded(tokens) {
  return {
    type: c.TOKEN_BALANCES_LOADED,
    tokens,
  };
}

export function fetchTokenList() {
  return {
    type: c.FETCH_TOKEN_LIST,
  };
}

export function tokenListLoaded(tokenList) {
  return {
    type: c.TOKEN_LIST_LOADED,
    tokenList,
  };
}

export function vaultsLoaded(vaults) {
  return {
    type: c.VAULTS_LOADED,
    vaults,
  };
}

export function startLoadingPrices() {
  return {
    type: c.START_LOADING_PRICES,
  };
}

export function pricesLoaded(prices) {
  return {
    type: c.PRICES_LOADED,
    prices,
  };
}

export function showConnectorModal(showModal) {
  return {
    type: c.SHOW_CONNECTOR_MODAL,
    showModal,
  };
}

export function setToken(token) {
  return {
    type: c.SET_TOKEN,
    token,
  };
}

export function setVault(vault) {
  return {
    type: c.SET_VAULT,
    vault,
  };
}

export function setDepositAmount(amount) {
  return {
    type: c.SET_DEPOSIT_AMOUNT,
    amount,
  };
}

export function setWithdrawalAmount(amount) {
  return {
    type: c.SET_WITHDRAWAL_AMOUNT,
    amount,
  };
}

export function setExchangeRate(rate) {
  return {
    type: c.SET_EXCHANGE_RATE,
    rate,
  };
}

export function updatePrices(tokens) {
  return {
    type: c.UPDATE_PRICES,
    tokens,
  };
}
