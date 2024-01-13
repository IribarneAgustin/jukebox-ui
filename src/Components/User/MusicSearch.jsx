import React, { useState } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import SearchInput from './SearchInput';
import LoadingSpinner from '../Utils/LoadingSpinner'
import UserLayout from './UserLayout';
import { notification } from 'antd';
import MusicList from './MusicList';

const MusicSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [preferenceId, setPreferenceId] = useState();
  const [loading, setLoading] = useState(false);
  const [purchaseInProgress, setPurchaseInProgress] = useState(false); //avoid multiples requests

  initMercadoPago("TEST-c2a8b2c6-e634-44b6-b5af-7b150e92222f");

  const searchMusic = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/spotify/track/name=${searchQuery}`);
      const data = await response.json();

      if (response.ok && data && data.tracks && data.tracks.items) {
        const sortedTracks = data.tracks.items.sort((a, b) => b.popularity - a.popularity);
        const topTracksCount = 10;
        const relevantTracks = sortedTracks.slice(0, topTracksCount);
        setTracks(relevantTracks);
      } else {
        throw new Error('Error fetching music');
      }
    } catch (error) {
      console.error('Error fetching music:', error);
      notification.error({
        message: 'Ocurrió un error inesperado. Por favor intente más tarde'
      });
    } finally {
      setLoading(false);
    }
  };

  const createPreference = async (track) => {
    const trackInfoDTO = {
      trackUri: track.uri,
      trackName: track.name,
      artistName: track.artists[0].name,
      albumCover: track.album.images[0].url
    };

    try {
      const response = await fetch("api/payment/generatePaymentId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackInfoDTO),
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

  const handleBuy = async (track) => {
    if (purchaseInProgress) {
      // If purchase is already in progress, do nothing
      return;
    }
    setPurchaseInProgress(true);
    
    try {
      const id = await createPreference(track);

      if (id) {
        setPreferenceId(id);
        const paymentUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${id}`;
        window.location.href = paymentUrl;

        // Dispatch your notification here if needed
      }
    } finally {
      setPurchaseInProgress(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <UserLayout>
        <div className="container mx-auto my-8 text-center">
          <h1 className="text-5xl font-extrabold mb-4 custom-bounce">BarPlay App</h1>

          <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-xl transition duration-300">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={searchMusic}
            />
          </div>

          {loading && <LoadingSpinner />}

          {!loading && (
            <MusicList tracks={tracks} onBuy={handleBuy} />
          )}

          {preferenceId && (
            <div className="mt-6">
              <Wallet initialization={{ preferenceId }} />
            </div>
          )}
        </div>
      </UserLayout>
    </div>
  );
};

export default MusicSearch;
