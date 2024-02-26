import React from 'react';


const SettingsInstructionsSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">¡Bienvenido a JBox App!</h2>

      <p className="text-white-500 mb-6">
        Los usuarios podrán elegir una canción para escuchar, y esta se agregará directamente a la cola de reproducción de su cuenta de Spotify, siempre y cuando realicen el pago correspondiente y la aplicación se encuentre correctamente configurada.
      </p>
      <p className="text-white-500 mb-6">
        A continuación, se presentan los pasos para realizar la configuración adecuada y asegurar un correcto funcionamiento.
      </p>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div>
            <h3 className="text-lg font-medium">Spotify</h3>
            <p className="text-white-500">Una vez logueado en JBox App su cuenta de Spotify ya está vinculada. Recuerde que siempre debe tener al menos un dispositivo con la aplicación de Spotify abierta mientras JBox App se encuentre en uso.</p>
            <p>Por otro lado, si desea vincular una lista de reproducción especial para JBox App, solo debe seguir los pasos en la sección "Spotify" de la barra de navegación izquierda</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <div>
            <h3 className="text-lg font-medium">Mercado Pago</h3>
            <p className="text-white-500">Debe vincular su cuenta de Mercado Pago para recibir los pagos en su cuenta. Puede seguir los pasos de la sección "Mercado Pago" de la barra de navegación izquierda</p>
          </div>
        </div>

      </div>
    </section>
  );
};


export default SettingsInstructionsSection;
