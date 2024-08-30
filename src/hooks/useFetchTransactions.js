import { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/fetchTransactions';

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { transactions, loading, error };
};

export default useFetchTransactions;
