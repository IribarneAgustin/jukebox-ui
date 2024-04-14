import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { PoweroffOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import useLogout from '../Admin/Logout'
import LoadingSpinner from '../Utils/LoadingSpinner';
import { API_BASE_URL } from '../Utils/Config';

const SettingsEnableSection = () => {
  const [isActive, setIsActive] = useState();
  const handleLogout = useLogout();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  const openNotification = (type) => {
    const message = isActive ? 'Aplicación desactivada' : 'Aplicación activada';
    notification[type]({
      message,
      duration: 2,
    });
  };

  const handleToggleService = async () => {
    const newStatus = !isActive;

    try {
      const response = await fetch(API_BASE_URL + '/api/admin/app/set/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setIsActive(newStatus);
      openNotification('success');
    } catch (error) {
      console.error(error);
      openNotification('error');
    }
  };


  useEffect(() => {
    // Fetch the initial status when the component mounts
    const fetchInitialStatus = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/api/admin/app/get/status',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
          }
        );

        if (response.status === 401) {
          // Handle 401 response by logging out the user
          handleLogout();
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }

        const data = await response.json();
        setIsActive(data.status != null ? data.status : false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    fetchInitialStatus();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="settings-enable-section" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h2 className="text-2xl font-semibold mb-4">Estado de la Aplicación</h2>

      <div className="status-indicator" style={{ color: isActive ? 'green' : 'red', fontSize: '24px', marginBottom: '10px' }}>
        {isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        <span style={{ marginLeft: '8px' }}>{isActive ? 'Activo' : 'Inactivo'}</span>
      </div>

      <Button
        type="primary"
        size="large"
        onClick={handleToggleService}
        icon={<PoweroffOutlined />}
        style={{ width: '200px' }}
      >
        {isActive ? 'Desactivar' : 'Activar'}
      </Button>
    </div>
  );
};

export default SettingsEnableSection;
