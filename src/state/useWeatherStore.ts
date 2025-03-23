import { create } from "zustand";
import {
  fetchWeatherData,
  fetchCurrentWeatherWithLatLon,
  fetchWeatherForcast,
  fetchWeatherForcastByCityName,
} from "../services/weather";

import { WeatherStore, Coordinates } from "../services/types";

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  forecast: null,
  input: "",
  error: null,
  loading: false,
  coordinates: null,

  setInput: (value) => set({ input: value }),

  fetchWeatherByCity: async (city) => {
    if (!city.trim()) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchWeatherData(city);
      set({ weather: data });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to Fetch the weather",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchCurrentLocatioWeather: async (coords: Coordinates) => {
    if (!coords) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchCurrentWeatherWithLatLon(coords);
      set({ weather: data });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error?.message
            : "Failed to Load the weather of your location",
      });
    } finally {
      set({ loading: false, error: null });
    }
  },

  fetchForcastWithLatLon: async (coords: Coordinates) => {
    if (!coords) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchWeatherForcast(coords);
      set({ forecast: data });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error?.message
            : "Failed to Load Forcast of the location",
      });
    } finally {
      set({ loading: false, error: null });
    }
  },

  fetchForcastWithCity: async (city) => {
    if (!city) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchWeatherForcastByCityName(city);
      set({ forecast: data });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error?.message
            : "Failed to load forcast for the city",
      });
    } finally {
      set({ loading: false, error: null });
    }
  },
}));
