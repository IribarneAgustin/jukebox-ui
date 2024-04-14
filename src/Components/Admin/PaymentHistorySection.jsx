import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import useLogout from '../Admin/Logout'
import LoadingSpinner from '../Utils/LoadingSpinner';
import { API_BASE_URL } from '../Utils/Config';

const PaymentHistorySection = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const [totalAmount, setTotalAmount] = useState(0);
  const handleLogout = useLogout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(API_BASE_URL + '/api/transaction/get', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          handleLogout();
        }
        
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);

          // Calculate total amount
          const total = data.reduce((sum, transaction) => sum + transaction.amount, 0);
          setTotalAmount(total);
        } else {
          console.error('Failed to fetch transaction history');
        }
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }  finally {
        setLoading(false)
      }
    };

    fetchTransactionHistory();
  }, [handleLogout]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'creationTimestamp',
      key: 'creationTimestamp',
      render: (timestamp) => formatDate(timestamp),
    },
    {
      title: 'Hora',
      dataIndex: 'creationTimestamp',
      key: 'creationTimestamp',
      render: (timestamp) => new Date(timestamp).toLocaleTimeString(),
    },
    {
      title: 'Canción',
      dataIndex: 'track',
      key: 'track',
      render: (track) => `${track.artistName} - ${track.trackName}`,
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mb-8">
      {/* Use the same background color as Ant Design Table */}
      <h2 className="text-2xl font-semibold mb-4">Historial de Pagos</h2>

      <div className="mt-4">
        <strong>Facturación Total: ${totalAmount.toFixed(2)}</strong>
      </div>
      <br></br>
      <Table
        style={{
          background: '#f0f2f5',
          borderRadius: '8px', // Set border-radius for rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Apply box-shadow for a subtle effect
        }}
        dataSource={currentTransactions}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: transactionsPerPage,
          total: transactions.length,
          onChange: handlePaginationChange,
          showSizeChanger: false,
        }}
      />

    </section>
  );
};

export default PaymentHistorySection;
