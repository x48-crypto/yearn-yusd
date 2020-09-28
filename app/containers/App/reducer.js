import produce from 'immer';
import { getVaultWithAlias } from 'utils/vaults';
import BigNumber from 'bignumber.js';
import * as c from './constants';

// The initial state of the App
export const initialState = {
  vaults: [],
  connected: false,
  ready: false,
  loading: {
    balances: true,
    exchangeRate: true,
  },
  userTokens: [],
  tokens: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    // Utility functions
    const updateTokens = (tokensToUpdate, tokenKeys) => {
      const oldTokens = state.tokens || [];
      const lowercaseAddress = token => {
        token.address = token.address.toLowerCase();
        return token;
      };
      const tokensToUpdateLowercaseAddress = _.map(
        tokensToUpdate,
        lowercaseAddress,
      );
      const updateToken = newToken => {
        const oldToken = _.find(oldTokens, { address: newToken.address }) || {};
        const updatedToken = _.clone(oldToken);
        _.each(tokenKeys, key => {
          let newVal = newToken[key];
          if (key === 'decimals') {
            if (typeof newVal === 'string') {
              newVal = parseInt(newVal, 10);
            }
          }
          updatedToken[key] = newVal;
        });
        return updatedToken;
      };
      const updatedTokens = _.map(tokensToUpdateLowercaseAddress, updateToken);
      const merged = _.merge(
        _.keyBy(oldTokens, 'address'),
        _.keyBy(updatedTokens, 'address'),
      );
      const balanceUsdSort = token => token.balanceUsd || 0;
      const balanceSort = token => token.balance || 0;
      let newTokens = _.values(merged);
      newTokens = _.orderBy(
        newTokens,
        [balanceUsdSort, balanceSort],
        ['desc', 'desc'],
      );

      draft.tokens = newTokens;
    };

    switch (action.type) {
      case c.CONNECTION_CONNECTED:
        draft.account = action.account;
        draft.connector = action.connector;
        draft.library = action.library;
        draft.chainId = action.chainId;
        draft.connected = true;
        draft.ready = false;
        break;
      case c.CONNECTION_UPDATED:
        draft.library = action.library;
        draft.chainId = action.chainId;
        draft.connected = action.active;
        break;
      case c.PRICES_LOADED: {
        updateTokens(action.prices, ['priceUsd', 'balanceUsd']);
        break;
      }
      case c.SET_TOKEN:
        draft.selectedToken = action.token;
        draft.depositAmount = '0.00';
        draft.withdrawalAmount = '0.00';
        draft.loading.exchangeRate = true;
        break;
      case c.SET_EXCHANGE_RATE:
        draft.exchangeRate = action.rate;
        draft.loading.exchangeRate = false;
        break;
      case c.SET_VAULT: {
        const vaultWithAlias = getVaultWithAlias(action.vault);
        draft.selectedVault = vaultWithAlias;
        break;
      }
      case c.SET_DEPOSIT_AMOUNT: {
        draft.depositAmount = action.amount;
        const exchangeRate = state.exchangeRate;
        const depositAmountNormalized = new BigNumber(action.amount)
          .dividedBy(10 ** 18)
          .toFixed(8);
        draft.depositAmountNormalized = depositAmountNormalized;
        const withdrawalAmount = new BigNumber(action.amount)
          .dividedBy(exchangeRate)
          .toFixed();
        const withdrawalAmountNormalized = new BigNumber(withdrawalAmount)
          .dividedBy(10 ** 18)
          .toFixed(8);
        draft.withdrawalAmount = withdrawalAmount;
        draft.withdrawalAmountNormalized = withdrawalAmountNormalized;
        break;
      }
      case c.SET_WITHDRAWAL_AMOUNT: {
        draft.withdrawalAmount = action.amount;
        const withdrawalAmountNormalized = new BigNumber(action.amount)
          .dividedBy(10 ** 18)
          .toFixed(8);
        draft.withdrawalAmountNormalized = withdrawalAmountNormalized;
        break;
      }
      case c.VAULTS_LOADED:
        draft.vaults = action.vaults;
        break;
      case c.USER_TOKENS_LOADED: {
        draft.userTokens = action.tokens;
        updateTokens(action.tokens, ['address', 'name', 'symbol', 'vault']);
        break;
      }
      case c.TOKEN_LIST_LOADED:
        updateTokens(action.tokenList, [
          'symbol',
          'decimals',
          'logoURI',
          'name',
          'address',
        ]);
        break;
      case c.TOKEN_BALANCES_LOADED:
        updateTokens(action.tokens, [
          'balance',
          'balanceNormalized',
          'decimals',
        ]);
        draft.loading.balances = false;
        break;

      case c.SHOW_CONNECTOR_MODAL:
        draft.showConnectorModal = action.showModal;
        break;
    }
  });

export default appReducer;
