import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import UserNavbar from './UserNavbar';
import background from '../../Assets/main-background.jpg'

export default function UserLayout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div>
        <UserNavbar />
      </div>

      <div className="flex-grow">
        {children}
      </div>

      <footer className="bg-opacity-70 p-4 text-center flex flex-col items-center">
        {/* Your footer content goes here */}
        <div>
          &copy; {currentYear} JBox App - Todos los derechos reservados.
        </div>
        <div className="flex mt-2">
          <a href="https://www.instagram.com/your_instagram_username" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white mx-2" />
          </a>
          <a href="mailto:your.email@example.com">
            <FaEnvelope className="text-white mx-2" />
          </a>
        </div>
      </footer>
    </div>
  );
}
