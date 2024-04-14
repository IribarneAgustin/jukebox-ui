import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import useLogout from './Logout'
import LoadingSpinner from '../Utils/LoadingSpinner';
import { API_BASE_URL } from '../Utils/Config';

const SettingsSpotifySection = () => {
  
  const [playlistId, setPlaylistId] = useState('');
  const handleLogout = useLogout();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleInputChange = (event) => {
    setPlaylistId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_BASE_URL + '/api/admin/app/playlist/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ playlistId }),
      });

      if (response.ok) {
        console.log('Playlist ID submitted successfully');
        openNotification('success', 'Playlist ID configurado correctamente');
      } else {
        console.error('Failed to submit Playlist ID');
        openNotification('error', 'Ocurrió un error al configurar el Playlist ID');
      }
    } catch (error) {
      console.error('Error submitting Playlist ID:', error);
      openNotification('error', 'Error', 'Ocurrió un error al configurar el Playlist ID');
    }

    console.log('Submitted Playlist ID:', playlistId);
  };


  useEffect(() => {
  const fetchPlaylistId = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/api/admin/app/get/playlist/id', {
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

        if (data && data.playlistId !== undefined) {
          setPlaylistId(data.playlistId);
        } else {
          console.error('Invalid data format or missing playlistId in the response');
          setPlaylistId('');
        }
      } else {
        console.error('Failed to fetch playlist ID');
        setPlaylistId('');
      }
    } catch (error) {
      console.error('Error fetching playlist ID:', error);
      setPlaylistId('');
    } finally {
      setLoading(false)
    }
  };

  fetchPlaylistId();
}, []);

const connectWithSpotify = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(API_BASE_URL + '/api/spotify/login', {
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
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
};

if (loading) {
  return <LoadingSpinner />;
}


  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Spotify</h2>

      <p className="mb-4">
        Para vincular su cuenta de Spotify debe presionar el siguiente botón y aceptar los permisos solicitados:
      </p>
      <button
        type="button"
        onClick={connectWithSpotify}
        className={`mt-4 bg-blue-500 text-white p-2 mb-3 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >              
      Conectar con Spotify
      </button>
      <br></br>
      <p className="mb-4">
        También, si desea guardar las canciones en un playlist exclusivo, debe pegar la url del mismo a continuación: 
      </p>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2" htmlFor="playlistId">
          Spotify Playlist:
        </label>
        <input
          type="text"
          id="playlistId"
          name="playlistId"
          value={playlistId}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full text-black"
          placeholder="Ejemplo: https://open.spotify.com/playlist/1EObkfZvl60Q3zfV3FYD00?si=3b981bf4277a479d"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Guardar
        </button>
      </form>

    </section>

  );
};

export default SettingsSpotifySection;
