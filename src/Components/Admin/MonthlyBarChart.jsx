import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useLogout from '../Admin/Logout'

const MonthlyBarChart = () => {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleLogout = useLogout();

  const fetchYearData = async (year) => {
    try {
      const response = await fetch(`/api/transaction/get/amountByYear/${year}`, {  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        handleLogout();
      }

      if (response.ok) {
        const result = await response.json();

        // Process the data to include all months with zero amounts
        const processedData = Array.from({ length: 12 }, (_, monthIndex) => {
          const existingEntry = result.totalAmountByMonth.find(entry => entry.month === monthIndex + 1);
          return {
            month: monthIndex + 1,
            Facturado: existingEntry ? existingEntry.total_Amount : 0,
          };
        });

        setData(processedData);

        // Calculate the total amount for display in the title
        const total = processedData.reduce((acc, entry) => acc + entry.Facturado, 0);
        setTotalAmount(total);
      } else {
        console.error(`Failed to fetch total amount for year ${year}`);
      }
    } catch (error) {
      console.error(`Error fetching total amount for year ${year}:`, error);
    }
  };

  const handlePrevYear = () => {
    setCurrentYear(prevYear => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(nextYear => nextYear + 1);
  };

  useEffect(() => {
    fetchYearData(currentYear);
  }, [currentYear]);

  const monthNamesSpanish = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  return (
    <div style={{ textAlign: 'center'}}>
      <h2 style={{ marginBottom: '20px', fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
        Facturación Acumulada Anual: $ {totalAmount.toFixed(2)}
      </h2>
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button style={buttonStyle} onClick={handlePrevYear}>&lt;</button>
        <h2 style={{ margin: '0 20px', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{currentYear}</h2>
        <button style={buttonStyle} onClick={handleNextYear}>&gt;</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => monthNamesSpanish[month - 1]} />


          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Facturado" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 15px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

export default MonthlyBarChart;
