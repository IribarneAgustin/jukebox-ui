import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../Utils/Config';

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(API_BASE_URL + '/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        console.log('Logged out successfully');
      } else {
        console.log('Failed to log out');
      }

    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      navigate('/admin/login');
    }
  }, [navigate]);

  return handleLogout;
};

export default useLogout;
