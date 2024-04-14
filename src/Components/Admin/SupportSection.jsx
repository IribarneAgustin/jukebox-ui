import React from 'react';

const SupportSection = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contacto de Soporte</h2>
      <p className="text-gray-400 mb-4">
        Para obtener asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.
      </p>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Email:</h3>
        <p>
          Envíenos un correo electrónico a <a className="text-blue-400" href="mailto:contacto@jboxapp.com">contacto@jboxapp.com</a>
        </p>
      </div>
    </div>
  );
};

export default SupportSection;
