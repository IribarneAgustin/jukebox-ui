import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserLayout from '../User/UserLayout';

const PostPaymentError = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('ErrorMessage component mounted');
    const params = new URLSearchParams(location.search);
    const messageParam = params.get('message');

    if (messageParam) {
      setErrorMessage(messageParam);
    }
  }, [location.search]);

  return (
    <UserLayout>
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-12 rounded-md shadow-lg">
          <h2 className="text-4xl font-bold mb-6">Error inesperado</h2>
          {errorMessage && (
            <div className="text-red-500 text-lg">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default PostPaymentError;
