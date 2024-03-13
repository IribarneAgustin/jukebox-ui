import React, { useState, useEffect } from 'react';
import backgroundImage from '../../Assets/login-form-background.jpg';
import LoadingSpinner from '../Utils/LoadingSpinner';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUrlParameter = (name) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    };

    const alertFromURL = getUrlParameter('error');
    if (alertFromURL) {
      setAlertMessage(decodeURIComponent(alertFromURL));
    }
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      if (response.ok) {
        console.log('Login successfully');
        fetchQueryParams();
      } else if (response.status === 401) {
        setAlertMessage('Usuario o contraseña inválidos');
      } else {
        setAlertMessage('Ocurrió un error inesperado');
        console.log('Login failed with status:', response.status);
      }
    } catch (error) {
      setAlertMessage('Ocurrió un error inesperado');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  async function fetchQueryParams() {
    try {
      setLoading(true);

      const response = await fetch('/api/spotify/login', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const queryParams = await response.text();
        const authorizationUrl = "https://accounts.spotify.com/authorize" + queryParams;
        window.location.href = authorizationUrl;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md w-full">
        {loading && <LoadingSpinner />} {/* Render LoadingSpinner when loading is true */}

        {alertMessage && (
          <div className="bg-red-500 text-white p-3 mb-4 flex items-center justify-center">
            <span className="mr-2">Error:</span>
            {alertMessage}
          </div>
        )}
        <div className="bg-white bg-opacity-80 p-6 rounded-md shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">JBox App</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full mb-4 bg-gray-100 bg-opacity-70 text-gray-800 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full mb-4 bg-gray-100 bg-opacity-70 text-gray-800 focus:outline-none focus:border-blue-500"
          />
          <div className="text-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
