import React from 'react';

const SettingsInstructionsSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">¡Bienvenido a BarPlay App!</h2>

      <p className="text-white-500 mb-6">
        Los usuarios podrán elegir una canción para escuchar, y esta se agregará directamente a la cola de su cuenta de Spotify, siempre y cuando realizen el pago correspondiente.
      </p>
      <p className="text-white-500 mb-6">
        A continuación, se presentan los pasos para
        realizar la configuración adecuada y asegurar un correcto funcionamiento.
      </p>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
            1
          </div>
          <div>
            <h3 className="text-lg font-medium">Spotify</h3>
            <p className="text-white-500">Primero que nada debe vincular su cuenta de spotify PREMIUM con la aplicación. Este paso lo realizará con ayuda de nuestro administrador, donde se le pedirá el mail con el cual esta registrado en Spotify y le llegará un mail para solicitar los permisos correspondientes.</p>

            <p className="text-white-500">Debe contar con la aplicacion de Spotify abierta en todo momento</p>

          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
            2
          </div>
          <div>
            <h3 className="text-lg font-medium">Mercado Pago</h3>
            <p className="text-white-500">Debe loguearse en mercado pago y aceptar los permisos para vincular la aplicación con su cuenta. Dentro de la seccion "Mercado Pago" de la barra de navegacion izquierda se encuentra el botón para solicitar dichos permisos</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <p>Listo! ya puede recibir los pagos y disfrutan de BarPlay App</p>
        </div>

      </div>
    </section>
  );
};

export default SettingsInstructionsSection;
