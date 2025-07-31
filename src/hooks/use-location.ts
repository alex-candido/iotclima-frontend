// src/hooks/use-location.ts


import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

export const useLocationService = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null | GeolocationPositionError>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  return { location, error };
};
