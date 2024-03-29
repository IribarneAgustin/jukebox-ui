import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import useLogout from '../Admin/Logout'

const SettingsPlaylistIdSection = () => {
  const [playlistId, setPlaylistId] = useState('');
  const handleLogout = useLogout();

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
      const response = await fetch('/api/admin/app/playlist/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      const response = await fetch('/api/admin/app/get/playlist/id', {
        method: 'GET',
        credentials: 'include',
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
    }
  };

  fetchPlaylistId();
}, [handleLogout]);


  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Spotify</h2>


      <p className="mb-4">
        Una vez logueado, su cuenta de Spotify ya está vinculada con JBox App.  
      </p>
      <p className="mb-4">
        Cuando un cliente solicite una canción, esta será encolada y si usted desea puede guardarlas en una lista de reproducción.
      </p>

      <p className="mb-4">
        Solo debe seguir los siguientes pasos para vincular la lista de reproducción deseada:
      </p>

      <ol className="mb-4">
        <li>• Abre Spotify y busca la lista de reproducción que deseas usar.</li>
        <li>• Haz clic en los tres puntos (Más opciones) junto al nombre de la lista.</li>
        <li>• Haz clic en "Compartir" y selecciona "Copiar URI de Spotify" o "Copiar enlace de la lista".</li>
        <li>• Pega el enlace aquí para extraer el ID de la lista de reproducción.</li>
      </ol>

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
          placeholder="Pega tu Spotify Playlist ID aquí"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Guardar
        </button>
      </form>

    </section>

  );
};

export default SettingsPlaylistIdSection;
