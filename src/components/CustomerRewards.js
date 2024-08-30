import React from 'react';
import useFetchTransactions from '../hooks/useFetchTransactions';
import aggregatePointsByMonth from '../utils/helper';
import CustomerRewardsList from './customerRewardsList';

const CustomerRewards = () => {
  const { transactions, loading, error } = useFetchTransactions();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const pointsByCustomer = aggregatePointsByMonth(transactions);

  return <CustomerRewardsList pointsByCustomer={pointsByCustomer} />;
};

export default CustomerRewards;
