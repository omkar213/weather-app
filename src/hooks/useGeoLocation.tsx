import { useEffect, useState } from "react";
import { Coordinates } from "../services/types";

interface GeoLocationState {
  coordinates: Coordinates | null;
  geoLocationerror: string | null;
  isLoading: boolean;
}

export function useGeoLocation() {
  const [locationData, setLocationData] = useState<GeoLocationState>({
    coordinates: null,
    geoLocationerror: null,
    isLoading: true,
  });

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  const getGeoLocation = () => {
    setLocationData((prev) => ({
      ...prev,
      geoLocationerror: null,
      isLoading: true,
    }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        geoLocationerror: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    function success(position: GeolocationPosition) {
      setLocationData({
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        geoLocationerror: null,
        isLoading: false,
      });
    }

    function errorFn(error: GeolocationPositionError) {
      let errorMessage: string;

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage =
            "Location permission denied. Please enable location access";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out.";
          break;
        default:
          errorMessage = "An unknown error occurred.";
      }

      setLocationData({
        coordinates: null,
        geoLocationerror: errorMessage,
        isLoading: false,
      });
    }

    navigator.geolocation.getCurrentPosition(success, errorFn, options);
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  return {
    ...locationData,
    getGeoLocation,
  };
}
