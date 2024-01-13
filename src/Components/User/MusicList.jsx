import React from 'react';

const MusicList = ({ tracks, onBuy }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {tracks.map((track) => (
        <li
          key={track.id}
          className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white cursor-pointer"
          onClick={() => onBuy(track)}
        >
          <img className="w-full" src={track.album.images[0].url} alt={track.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{track.name}</div>
            <p className="text-gray-400">{track.artists[0].name}</p>
          </div>
          {/* Optionally, you can keep the button for users who prefer to click on the button */}
          <div className="px-6 py-4">
            <button
              onClick={() => onBuy(track)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Escuchar!
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MusicList;
