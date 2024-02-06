import React, { useEffect, useState } from 'react';
import AdminNavBar from './AdminNavBar';
import Sidebar from './Sidebar';
import SettingStatisticsSection from './SettingsStatisticsSection';
import SettingsPriceSection from './SettingsPriceSection';
import SettingsScheduleSection from './SettingsScheduleSection'
import SettingsInstructionsSection from './SettingsInstructionsSection';
import SettingsPlaylistIdSection from './SettingsPlaylistIDSection';
import PaymentHistorySection from './PaymentHistorySection';
import SettingsEnableSection from './SettingsEnableSection'
import SupportSection from './SupportSection'
import SettingsMercadoPagoSection from './SettingsMercadoPagoSection'
import { useLocation } from 'react-router-dom';
import { notification } from 'antd';

const AdminPanel = () => {
    const [currentSection, setCurrentSection] = useState('SettingsInstructionsSection');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const errorMessage = queryParams.get('error');
    const successMessage = queryParams.get('message');
  
    useEffect(() => {
      if (errorMessage) {
        // Display error notification
        notification.error({
          message: 'Error',
          description: errorMessage,
        });
      } else if (successMessage) {
        // Display success notification
        notification.success({
          message: 'OK',
          description: successMessage,
        });
      }
    }, [errorMessage, successMessage]);

    const renderSection = () => {
        switch (currentSection) {
            case 'SettingsInstructionsSection':
                return <SettingsInstructionsSection />;
            case 'SettingsPlaylistIdSection':
                return <SettingsPlaylistIdSection />;
            case 'SettingsPriceSection':
                return <SettingsPriceSection />;
            case 'SettingsScheduleSection':
                return <SettingsScheduleSection />;
            case 'SettingStatisticsSection':
                return <SettingStatisticsSection />;
            case 'PaymentHistorySection':
                return <PaymentHistorySection />;
            case 'SettingsEnableSection':
                return <SettingsEnableSection />
            case 'SupportSection':
                 return <SupportSection />
            case 'SettingsMercadoPagoSection':
                 return <SettingsMercadoPagoSection />
            default:
                return null;
        }
    };

    return (
        <>
            {/* Navigation */}
            <AdminNavBar setCurrentSection={setCurrentSection} />
            <div className="bg-gray-800 h-screen text-white font-sans">


                {/* Main Content */}
                <div className="flex h-full">
                    {/* Sidebar */}
                    <Sidebar setCurrentSection={setCurrentSection} />

                    {/* Main Content Area */}
                    <div className="w-3/4 p-4">
                        {renderSection()}
                    </div>
                </div>
            </div>
        </>);
};

export default AdminPanel;
