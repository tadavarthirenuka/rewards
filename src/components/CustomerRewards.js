import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/fetchTransactions';

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50; // 2 points for every dollar over $100 + 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    points += (amount - 50) * 1; // 1 point for every dollar between $50 and $100
  }
  return points;
};

const aggregatePointsByMonth = (transactions) => {
  const pointsByCustomer = {};

  transactions.forEach(({ customerId, name, date, amount }) => {
    const monthYear = new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' });
    const points = calculatePoints(amount);

    if (!pointsByCustomer[customerId]) {
      pointsByCustomer[customerId] = { name, monthlyPoints: {}, totalPoints: 0 };
    }

    if (!pointsByCustomer[customerId].monthlyPoints[monthYear]) {
      pointsByCustomer[customerId].monthlyPoints[monthYear] = 0;
    }

    pointsByCustomer[customerId].monthlyPoints[monthYear] += points;
    pointsByCustomer[customerId].totalPoints += points;
  });

  return pointsByCustomer;
};

const CustomerRewards = () => {
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const pointsByCustomer = aggregatePointsByMonth(transactions);

  return (
    <div className="rewards-container">
      <h1>Customer Rewards</h1>
      {Object.entries(pointsByCustomer).map(([customerId, { name, monthlyPoints, totalPoints }]) => (
        <div key={customerId} className="customer-reward">
          <h2>{name}</h2>
          <ul>
            {Object.entries(monthlyPoints).map(([monthYear, points]) => (
              <li key={monthYear}>
                {monthYear}: {points} points
              </li>
            ))}
          </ul>
          <p>Total Points: {totalPoints}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerRewards;
