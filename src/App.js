import React from 'react';
import CustomerRewards from './components/CustomerRewards';

const App = ({ data }) => {
  const transactions = data?.transactions || [];
  return (
    <div className="App">
      <CustomerRewards transactions={transactions} />
    </div>
  );
};

export default App;