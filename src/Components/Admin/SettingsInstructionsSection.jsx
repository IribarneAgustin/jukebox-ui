import React from 'react';

const SettingsInstructionsSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">¡Bienvenido a JukeBoxApp!</h2>

      <p className="text-white-500 mb-6">
        A continuación, se presentan los pasos para
        realizar la configuración adecuada.
      </p>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
            1
          </div>
          <div>
            <h3 className="text-lg font-medium">Spotify</h3>
            <p className="text-gray-500">Debe contar con la aplicacion de SPOTIFY abierta en todo momento</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
            2
          </div>
          <div>
            <h3 className="text-lg font-medium">Paso 2</h3>
            <p className="text-gray-500">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
            3
          </div>
          <div>
            <h3 className="text-lg font-medium">Paso 3</h3>
            <p className="text-gray-500">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
            4
          </div>
          <div>
            <h3 className="text-lg font-medium">Paso 4</h3>
            <p className="text-gray-500">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
            5
          </div>
          <div>
            <h3 className="text-lg font-medium">Paso 5</h3>
            <p className="text-gray-500">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsInstructionsSection;
