export const fetchTransactions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulated transaction data
        resolve([
          { customerId: 1, name: 'John Doe', date: '2024-06-15', amount: 120 },
          { customerId: 1, name: 'John Doe', date: '2024-07-03', amount: 75 },
          { customerId: 1, name: 'John Doe', date: '2024-08-21', amount: 200 },
          { customerId: 2, name: 'Jane Smith', date: '2024-06-22', amount: 90 },
          { customerId: 2, name: 'Jane Smith', date: '2024-07-11', amount: 110 },
          { customerId: 2, name: 'Jane Smith', date: '2024-08-18', amount: 130 },
        ]);
      }, 1000); // Simulate 1 second delay
    });
  };