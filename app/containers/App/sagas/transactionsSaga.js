import request from 'utils/request';

import * as r from 'redux-saga/effects';
import * as s from '../selectors';
import * as a from '../actions';
import * as c from '../constants';

const pollPeriod = 5 * 60 * 1000;

// function fetchIcon(contractAddress) {
//   const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddrss}`;
// }

export function* poll() {
  const account = yield r.select(s.selectAccount());
  const vaults = yield r.select(s.select('vaults'));
  const vaultsAddresses = _.map(vaults, vault => vault.address);
  const apiKey = 'GEQXZDY67RZ4QHNU1A57QVPNDV3RP1RYH4';

  const symbolAliases = {
    'yDAI+yUSDC+yUSDT+yTUSD': 'yCRV',
    crvRenWSBTC: 'crvBTC',
    'yDAI+yUSDC+yUSDT+yBUSD': 'crvBUSD',
  };

  while (true) {
    const transactionsUrl = `http://api.etherscan.io/api?module=account&action=tokentx&address=${account}&startblock=0&endblock=999999999&sort=desc&apikey=${apiKey}`;
    try {
      const transactionsResp = yield r.call(request, transactionsUrl);
      const transactions = transactionsResp.result;
      const transactionsByToken = _.uniqBy(transactions, 'contractAddress');
      const addToken = (acc, token) => {
        const { tokenSymbol } = token;
        const symbol = symbolAliases[tokenSymbol] || tokenSymbol;
        const tokenIsVault = !!_.find(
          vaultsAddresses,
          address =>
            address.toLowerCase() === token.contractAddress.toLowerCase(),
        );
        const newToken = {
          address: token.contractAddress,
          name: token.tokenName,
          symbol,
          vault: tokenIsVault,
        };
        acc.push(newToken);
        return acc;
      };
      const newTokens = _.reduce(transactionsByToken, addToken, []);
      yield r.put(a.userTokensLoaded(newTokens));
    } catch (err) {
      console.log('Error reading transactions', err);
    }
    yield r.delay(pollPeriod);
  }
}

export function* startPolling() {
  yield r.put(a.startLoadingUserTokens());
}

export default function* initialize() {
  yield r.takeLatest(c.VAULTS_LOADED, startPolling);
  while (true) {
    yield r.take(c.START_LOADING_USER_TOKENS);
    yield r.race([r.call(poll), r.take(c.CONNECTION_UPDATED)]);
  }
}
