import React from 'react';

const Sidebar = ({ setCurrentSection }) => {
  return (
    <div className="w-1/4 bg-gray-900 p-4">
      <ul>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsInstructionsSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Instrucciones
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsPlaylistIdSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Spotify
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsPriceSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Precio
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsScheduleSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Horario
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('PaymentHistorySection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Historial de pagos
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingStatisticsSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Ganancias
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsEnableSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Activar/Desactivar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
