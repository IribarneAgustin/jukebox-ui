import React from 'react';


const SettingsInstructionsSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">¡Bienvenido a JBox App!</h2>

      <p className="text-white-500 mb-6">
        A continuación, se presentan los pasos para realizar la configuración adecuada y asegurar un correcto funcionamiento.
      </p>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div>
            <h3 className="text-lg font-medium">Spotify</h3>
            <p>Debe vincular su cuenta de Spotify, para esto solo debe presionar el botón "Conectar con Spotify" en el apartado "Spotify" de la barra de navegación</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <div>
            <h3 className="text-lg font-medium">Mercado Pago</h3>
            <p className="text-white-500">Debe vincular su cuenta de Mercado Pago para recibir los pagos en su cuenta. Puede seguir los pasos de la sección "Mercado Pago" de la barra de navegación</p>
          </div>
        </div>

      </div>
    </section>
  );
};


export default SettingsInstructionsSection;
