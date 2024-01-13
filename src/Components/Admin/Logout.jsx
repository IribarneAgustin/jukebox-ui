import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
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
