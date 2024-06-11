import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import UserLayout from './UserLayout';
import { API_BASE_URL } from '../Utils/Config';

const TrackQueue = () => {
  const [enqueuedTracks, setEnqueuedTracks] = useState([]);

  useEffect(() => {
    const fetchEnqueuedTracks = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/api/spotify/track/list/queue');
        const data = await response.json();
        setEnqueuedTracks(data);

        // Check for message in URL
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');
        
        if (message === 'OK') {
          // Display success notification
          notification.success({
            message: '¡Canción agregada a la cola!'
          });
        }
      } catch (error) {
        console.error('Error fetching enqueued tracks:', error);
      }
    };

    fetchEnqueuedTracks();
  }, []);


  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <div className="bg-opacity-70 text-white min-h-screen">
      <UserLayout>
        <div className="container mx-auto my-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Últimas canciones agregadas</h1>
          <div className="max-w-md mx-auto bg-purple-950 bg-opacity-85 p-6 rounded-md shadow-lg hover:shadow-xl transition duration-300"> 
            <ul className="list-none p-0 m-0">
              {enqueuedTracks.map((track) => (
                <li key={track.addedAt} className="border-b border-gray-700 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={track.albumCover}
                        alt={track.trackName}
                        className="w-10 h-10 object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">
                          {track.artistName} - {track.trackName}
                        </h3>
                      </div>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                          {formatTimestamp(track.addedAt)}
                        </h3>
                      </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />
        </div>
      </UserLayout>
    </div>
  );
};

export default TrackQueue;
