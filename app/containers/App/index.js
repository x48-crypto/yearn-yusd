import React, { useEffect } from 'react';
import ConnectionProvider from 'containers/ConnectionProvider';
import Dashboard from 'components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useDispatch } from 'react-redux';
import pricesSaga from 'containers/App/sagas/pricesSaga';
import transactionsSaga from 'containers/App/sagas/transactionsSaga';
import vaultsSaga from 'containers/App/sagas/vaultsSaga';
import tokenListSaga from 'containers/App/sagas/tokenListSaga';
import tokenBalancesSaga from 'containers/App/sagas/tokenBalancesSaga';
import selectedTokenSaga from 'containers/App/sagas/selectedTokenSaga';
import reducer from 'containers/App/reducer';
import * as a from 'containers/App/actions';

export default function App() {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'pricesSaga', saga: pricesSaga });
  useInjectSaga({ key: 'transactionsSaga', saga: transactionsSaga });
  useInjectSaga({ key: 'vaultsSaga', saga: vaultsSaga });
  // useInjectSaga({ key: 'tokenListSaga', saga: tokenListSaga });
  useInjectSaga({ key: 'tokenBalancesSaga', saga: tokenBalancesSaga });
  useInjectSaga({ key: 'selectedTokenSaga', saga: selectedTokenSaga });

  const dispatch = useDispatch();
  const init = () => {
    dispatch(a.fetchTokenList());
  };
  useEffect(init, []);
  return (
    <React.Fragment>
      <ConnectionProvider>
        <Dashboard />
      </ConnectionProvider>
    </React.Fragment>
  );
}
