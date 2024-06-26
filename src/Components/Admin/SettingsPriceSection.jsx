import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import useLogout from '../Admin/Logout'
import LoadingSpinner from '../Utils/LoadingSpinner';
import { API_BASE_URL } from '../Utils/Config';

const SettingsPriceSection = () => {
  const [trackPrice, setTrackPrice] = useState('');
  const handleLogout = useLogout();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handlePriceChange = (event) => {
    setTrackPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_BASE_URL + '/api/admin/track/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ trackPrice }),
      });

      if (response.ok) {
        console.log('Track price submitted successfully');
        openNotification('success', 'Precio configurado correctamente');
      } else {
        console.error('Failed to submit track price');
        openNotification('error', 'Ocurrió un error al configurar el precio');
      }
    } catch (error) {
      console.error('Error submitting track price:', error);
      openNotification('error', 'Error', 'An error occurred while submitting track price');
    }
  };

  useEffect(() => {
    const fetchTrackPrice = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/api/admin/track/get/price', {
          method: 'GET',
          credentials: 'include',
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          handleLogout();
        }

        if (response.ok) {
          const data = await response.json();

          if (data && data.trackPrice !== undefined) {
            setTrackPrice(data.trackPrice.toString());
          } else {
            console.error('Invalid data format or missing trackPrice in the response');
          }
        } else {
          console.error('Failed to fetch track price');
        }
      } catch (error) {
        console.error('Error fetching track price:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchTrackPrice();
  }, [handleLogout]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Precio por canción</h2>
      <form onSubmit={handleSubmit} className="flex">
        <div className="flex items-center mb-4 mr-4">
          <input
            type="number"
            id="trackPrice"
            name="trackPrice"
            value={trackPrice}
            min={0}
            onChange={handlePriceChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-900"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Guardar
          </button>
        </div>
      </form>
      <p className="text-white text-sm mt-2 italic">
        *Se aplicará una tarifa de servicio por transacción. Además la billetera virtual puede cobrar comisiones según el medio de pago empleado.
      </p>
      <p className="text-white text-sm mt-2 italic">
        *La moneda a considerar será la que se encuentra configurada en el medio de pago.
      </p>

    </section>
  );
};

export default SettingsPriceSection;
