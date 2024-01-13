import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import UserLayout from './UserLayout';

const TrackQueue = () => {
  const [enqueuedTracks, setEnqueuedTracks] = useState([]);

  useEffect(() => {
    const fetchEnqueuedTracks = async () => {
      try {
        const response = await fetch('/api/spotify/track/list/queue');
        const data = await response.json();
        setEnqueuedTracks(data);

        // Check for message in URL
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');

        if (message) {
          // Display notification with the message
          notification.success({
            message: 'Canción agregada a la cola!',
            description: message,
          });
        }
      } catch (error) {
        console.error('Error fetching enqueued tracks:', error);
      }
    };

    fetchEnqueuedTracks();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <UserLayout>
        <div className="container mx-auto my-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Últimas canciones agregadas</h1>
          <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-xl transition duration-300">
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
                        <h3 className="text-lg font-semibold">{track.trackName}</h3>
                        <p className="text-gray-400">{track.artistName}</p>
                      </div>
                    </div>
                    <p className="text-gray-400">{new Date(track.addedAt).toLocaleTimeString()}</p>
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
