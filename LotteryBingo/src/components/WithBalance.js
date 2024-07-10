import React from 'react';

import { BalanceContext } from './BalanceContext';
const withBalance = (WrappedComponent) => {
  return (props) => (
    <BalanceContext.Consumer>
      {(balance) => <WrappedComponent {...props} balance={balance} />}
    </BalanceContext.Consumer>
  );
};

export default withBalance;