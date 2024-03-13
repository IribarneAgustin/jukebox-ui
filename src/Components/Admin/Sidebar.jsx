import React from 'react';
import { FaBook, FaSpotify, FaMoneyBillAlt, FaDollarSign, FaClock, FaHistory, FaChartBar, FaToggleOn } from 'react-icons/fa';

const Sidebar = ({ setCurrentSection }) => {
  return (
    <div className="w-1/8 p-6 hidden sm:block">
      <ul>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsInstructionsSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaBook className="mr-2" /> Instrucciones
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsPlaylistIdSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaSpotify className="mr-2" /> Spotify
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsMercadoPagoSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaMoneyBillAlt className="mr-2" /> Mercado Pago
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsPriceSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaDollarSign className="mr-2" /> Precio
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsScheduleSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaClock className="mr-2" /> Horario
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('PaymentHistorySection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaHistory className="mr-2" /> Historial de pagos
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingStatisticsSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaChartBar className="mr-2" /> Ganancias
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setCurrentSection('SettingsEnableSection')}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            <FaToggleOn className="mr-2" /> Activar/Desactivar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
