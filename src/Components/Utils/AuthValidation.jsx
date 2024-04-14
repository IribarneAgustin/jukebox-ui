import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../Utils/Config';

const authValidation = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if user is authenticated by making a request to a protected endpoint
      const isAuthenticated = checkAuthentication(navigate);

      if (!isAuthenticated) {
        navigate('/admin/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  const checkAuthentication = async (navigate) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(API_BASE_URL + '/api/auth/test', {
        method: 'GET',
        credentials: 'include',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log(response)
      if (response.ok) {
        return true;
      } else if (response.status === 403) {
        navigate('/admin/login');
        return false;
      } else {
        console.error('Error checking authentication:', response.status);
        navigate('/admin/login');
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigate('/admin/login');
      return false;
    }
  };

  return AuthWrapper;
};

export default authValidation;
