import React from 'react';

const CustomerRewardsList = ({ pointsByCustomer }) => (
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

export default CustomerRewardsList;