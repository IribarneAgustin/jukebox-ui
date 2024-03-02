import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import { API_WS_URL } from '../Utils/Config';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useLogout from '../Admin/Logout'

export default function AdminNavBar({ setCurrentSection }) {
  const disclosureButtonRef = useRef();

  const [notificationListVisible, setNotificationListVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [showNotificationCount, setShowNotificationCount] = useState(false);
  const handleLogout = useLogout();

  const navigation = [
    { name: 'JBox App - ADMINISTRADOR', href: '/admin/dashboard', current: false },
  ];

  const onLogoutClick = () => {
    handleLogout();
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }


  const handleNotificationClick = () => {
    setNotificationListVisible((prev) => !prev);
  };

  const handleNotificationIconClick = () => {
    setNotificationListVisible(!notificationListVisible);
    setNewNotificationsCount(0);
  };


  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/notification/get");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error while fetching notifications:', error);
    }
  }, [setNotifications]);

  const connect = useCallback(() => {
    const socket = new SockJS(API_WS_URL);
    const client = Stomp.over(socket);
    setStompClient(client);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      client.subscribe('/topic/notifications', (notification) => {
        if (notification) {
          console.log("new notify arrived")
          setNewNotificationsCount((prevCount) => prevCount + 1);
          setShowNotificationCount(true);
          fetchNotifications();
        }
      });
    });
  }, [setStompClient, setNewNotificationsCount, setShowNotificationCount, fetchNotifications]);


  function formatTime(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} hs`;
  }


  const disconnect = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }, [stompClient]);


  useEffect(() => {
    connect();
    fetchNotifications();
    return () => {
      disconnect();
    };
  }, [connect, disconnect, fetchNotifications]);



  const handleNavigationItemClick = (section) => {
    setCurrentSection(section);
    handleDisclosureButtonRefClick();
  };

  const handleDisclosureButtonRefClick = () => {
    if (disclosureButtonRef.current) {
      disclosureButtonRef.current.click();
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-900 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button ref={disclosureButtonRef} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="hidden sm:block flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-8 w-auto cursor-pointer"
                      src={logo}
                      alt="JBox App"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative flex items-center">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={handleNotificationIconClick}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  {showNotificationCount && newNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                      {newNotificationsCount}
                    </span>
                  )}
                </button>
                {notificationListVisible && notifications && notifications.length > 0 && (
                  <div
                    className="absolute right-0 mt-2 top-8 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    onClick={handleNotificationClick}
                  >
                    {notifications.map((notification, index) => (
                      <div key={`${notification.id}-${index}`} className="px-4 py-2 text-sm text-gray-700">
                        {`${notification.description} a las ${formatTime(notification.creationTimestamp)}`}
                      </div>
                    ))}
                  </div>
                )}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={logo}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setCurrentSection('SupportSection')}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                          >
                            Ayuda - Soporte
                          </button>

                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={onLogoutClick}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                          >
                            Cerrar Sesión
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              {open && (
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('SettingsInstructionsSection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Instrucciones
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('SettingsPlaylistIdSection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Spotify
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('SettingsMercadoPagoSection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Mercado Pago
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('SettingsPriceSection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Precio
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('SettingsScheduleSection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Horario
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('PaymentHistorySection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Historial de pagos
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('SettingStatisticsSection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Ganancias
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigationItemClick('SettingsEnableSection')}
                        className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                      >
                        Activar/Desactivar
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </Disclosure.Panel>

          </div>
        </>
      )}
    </Disclosure>
  );


}
