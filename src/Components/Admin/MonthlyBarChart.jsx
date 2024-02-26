import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useLogout from '../Admin/Logout';

const MonthlyBarChart = () => {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleLogout = useLogout();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const monthNamesSpanish = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  return (
    <div className="text-center">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Facturación Acumulada Anual: $ {totalAmount.toFixed(2)}
      </h2>
      <div className="flex items-center justify-center space-x-4">
        <button className="px-4 py-2 text-xl font-bold cursor-pointer bg-green-500 text-white rounded" onClick={handlePrevYear}>&lt;</button>
        <h2 className="m-0 text-2xl font-bold text-white">{currentYear}</h2>
        <button className="px-4 py-2 text-xl font-bold cursor-pointer bg-green-500 text-white rounded" onClick={handleNextYear}>&gt;</button>
      </div>

      {/* Web Graph */}
      {!isMobile && (
        <div className="hidden md:block">
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
      )}

      {/* Mobile Graph */}
      {isMobile && (
        <div className="md:hidden">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, bottom: 1 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Facturado" fill="#82ca9d" stackId="stack" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
  



export default MonthlyBarChart;