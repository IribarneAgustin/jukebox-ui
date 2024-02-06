import React, { useState } from 'react';
import { notification } from 'antd';

const SettingsMercadoPagoSection = () => {
  const [loading, setLoading] = useState(false);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const connectWithMercadoPago = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/mp/login', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Connected with Mercado Pago successfully');
        openNotification('success', 'Conectado correctamente con Mercado Pago');
      } else {
        console.error('Failed to connect with Mercado Pago');
        openNotification('error', 'Ocurrió un error al conectarse con Mercado Pago');
      }
    } catch (error) {
      console.error('Error connecting with Mercado Pago:', error);
      openNotification('error', 'Error', 'Ocurrió un error al conectarse con Mercado Pago');
    }

    setLoading(false);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Conexión con Mercado Pago</h2>

      <p className="mb-4">
        Para recibir los pagos en tu cuenta de Mercado Pago, debes estar logueado{' '}
        <a href="https://www.mercadopago.com/" className="text-blue-500 underline" target='_blank'>
          aquí
        </a>{' '}
        y luego presionar el siguiente botón para vincularla con la aplicación:
      </p>

      <button
        type="button"
        onClick={connectWithMercadoPago}
        className={`mt-4 bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Conectando...' : 'Conectar con Mercado Pago'}
      </button>
    </section>
  );

};

export default SettingsMercadoPagoSection;
