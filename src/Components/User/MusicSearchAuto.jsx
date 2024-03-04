import React, { useState } from 'react';
import { Wallet } from "@mercadopago/sdk-react";
import SearchInputAuto from './SearchInputAuto';
import LoadingSpinner from '../Utils/LoadingSpinner'
import UserLayout from './UserLayout';
import { notification } from 'antd';
import _debounce from 'lodash/debounce';

const MusicSearchAuto = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [preferenceId, setPreferenceId] = useState();
  const [loading, setLoading] = useState(false);
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);
  const [suggestions, setSuggestions] = useState([]);


  const searchMusic = async (value) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/spotify/track/${value}`);
      const data = await response.json();
      if (response.ok) {
        setSuggestions(data);
      } else {
        throw new Error('Error fetching music');
      }
    } catch (error) {
      console.error('Error fetching music:', error);
      notification.error({
        message: 'Ocurrió un error inesperado. Por favor intente más tarde',
      });
    } finally {
      setLoading(false);
    }
  };


  const debouncedSearchMusic = _debounce(searchMusic, 600);

  const onSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 2) {
        debouncedSearchMusic(value);
    }
  };


  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const createPreference = async (track) => {
    const trackInfoDTO = {
      trackUri: track.spotifyURI,
      trackName: track.trackName,
      artistName: track.artistName,
      albumCover: track.albumCover
    };
    const paymentGateway = "Mercado Pago";
    try {
      const response = await fetch("/api/payment/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackInfoDTO: { ...trackInfoDTO },
          paymentGateway: paymentGateway,
        }),
      });
  

      if (response.ok) {
        return response.text();
      } else {
        const errorMessage = await response.text();
        if (response.status === 503) {
          notification.error({
            message: 'El servicio no está disponible. Por favor, inténtelo más tarde.'
          });
        } else {
          notification.error({
            message: 'Ocurrió un error inesperado. Por favor, intente más tarde.'
          });
        }
        console.error("API error:", errorMessage);
        return null;
      }
    } catch (error) {
      notification.error({
        message: 'Ocurrió un error inesperado. Por favor, intente más tarde.'
      });
      console.error("Fetch error:", error);
      return null;
    }
  };

  const handleBuy = async (suggestion) => {
    console.log(suggestion)
    if (purchaseInProgress) {
      return;
    }
    setPurchaseInProgress(true);

    try {
      const id = await createPreference(suggestion);

      if (id) {
        setPreferenceId(id);
        const paymentUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${id}`;
        window.location.href = paymentUrl;
      }
    } finally {
      setPurchaseInProgress(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <UserLayout>
        <div className="container mx-auto my-8 text-center">
          <h1 className="text-5xl font-extrabold mb-4 custom-bounce">JBox App</h1>

          <div className="max-w-md mx-auto p-6 transition duration-300">
            <SearchInputAuto
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onBuy={handleBuy}
            />
          </div>

          {loading && <LoadingSpinner />}

          {preferenceId && (
            <div className="mt-6">
              <Wallet initialization={{ preferenceId }} />
            </div>
          )}

          {suggestions.length === 0 && searchQuery.length > 3 && (
            <p className="text-white-800 mt-4">No se encontraron resultados.</p>
          )}
        </div>
      </UserLayout>
    </div>
  );

};

export default MusicSearchAuto;