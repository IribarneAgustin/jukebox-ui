import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import useLogout from '../Admin/Logout';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { API_BASE_URL } from '../Utils/Config';

const SettingsScheduleSection = () => {
  const [fromHour, setFromHour] = useState('');
  const [toHour, setToHour] = useState('');
  const handleLogout = useLogout();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  const handleFromHourChange = (event) => {
    setFromHour(event.target.value);
  };

  const handleToHourChange = (event) => {
    setToHour(event.target.value);
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_BASE_URL + '/api/admin/app/schedule', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fromHour, toHour }),
      });

      if (response.ok) {
        console.log('Service schedule submitted successfully');
        openNotification('success', 'Horario guardado correctamente');
      } else {
        console.error('Failed to submit service schedule');
        openNotification('error', 'Ocurrió un error al guardar el horario de servicio');
      }
    } catch (error) {
      console.error('Error submitting service schedule:', error);
      openNotification('error', 'Error', 'Ocurrió un error al guardar el horario de servicio');
    }
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/api/admin/app/get/schedule', {
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
          setFromHour(data.fromHour || '');
          setToHour(data.toHour || '');
        } else {
          console.log(response);
          console.error('Failed to fetch service schedule');
        }
      } catch (error) {
        console.error('Error fetching service schedule:', error);
        openNotification('error', 'Error', 'Ocurrió un error al obtener el horario de servicio');
      } finally {
        setLoading(false)
      }
    };

    fetchSchedule();
  }, [handleLogout]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Horario de funcionamiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fromHour" className="block text-sm font-medium text-white-800 mb-2">
            Desde
          </label>
          <input
            type="time"
            id="fromHour"
            name="fromHour"
            value={fromHour}
            onChange={handleFromHourChange}
            className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="toHour" className="block text-sm font-medium text-white-800 mb-2">
            Hasta
          </label>
          <input
            type="time"
            id="toHour"
            name="toHour"
            value={toHour}
            onChange={handleToHourChange}
            className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Guardar
          </button>
        </div>
      </form>
    </section>
  );
};

export default SettingsScheduleSection;
