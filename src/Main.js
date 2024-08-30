import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { fetchTransactions } from './api/fetchTransactions';

const Main = () => {
  const [data, setData] = useState({ transactions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await fetchTransactions();
        setData({ transactions });
      } catch (err) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return <App data={data} />;
};

ReactDOM.render(<Main />, document.getElementById('root'));
