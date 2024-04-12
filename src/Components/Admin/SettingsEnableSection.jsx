import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { PoweroffOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import useLogout from '../Admin/Logout'
import LoadingSpinner from '../Utils/LoadingSpinner';

const SettingsEnableSection = () => {
  const [isActive, setIsActive] = useState(true);
  const handleLogout = useLogout();
  const [loading, setLoading] = useState(true);

  const openNotification = (type) => {
    const message = isActive ? 'Aplicación desactivada' : 'Aplicación activada';
    notification[type]({
      message,
      duration: 2,
    });
  };

  const handleToggleService = () => {
    const newStatus = !isActive;
    
    fetch('/api/admin/app/set/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        setIsActive(newStatus);
      })
      .then(() => {
        openNotification('success');
      })
      .catch((error) => {
        console.error(error);
        openNotification('error');
      });
  };

useEffect(() => {
  // Fetch the initial status when the component mounts
  const fetchInitialStatus = async () => {
    try {
      const response = await fetch('/api/admin/app/get/status');

      if (response.status === 401) {
        // Handle 401 response by logging out the user
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }

      const data = await response.json();
      setIsActive(data.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  fetchInitialStatus();
}, [handleLogout]);

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
