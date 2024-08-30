const calculatePoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2 + 50; // 2 points for every dollar over $100 + 1 point for every dollar between $50 and $100
    } else if (amount > 50) {
      points += (amount - 50) * 1; // 1 point for every dollar between $50 and $100
    }
    return parseFloat(points.toFixed(2));;
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

  export default aggregatePointsByMonth;