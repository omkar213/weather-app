/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
  fetchWeatherData,
  fetchCurrentWeatherWithLatLon,
  fetchWeatherForcast,
  fetchWeatherForcastByCityName,
} from "../services/weather";

import { WeatherStore, Coordinates, weatherData } from "../services/types";

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  forecast: null,
  input: "",
  lastSearchedCity: "",
  error: null,
  loading: false,
  coordinates: null,
  favouriteCities: [],
  theme: localStorage.getItem("theme") || "light",

  setTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    document.body.classList.toggle("dark", theme === "dark");
    set({ theme });
  },

  toggleFavouriteCity: (city: weatherData) => {
    set((state) => {
      const isAlreadyFavourite = state.favouriteCities.some(
        (fav: weatherData) => fav.id === city.id
      );

      return {
        favouriteCities: isAlreadyFavourite
          ? state.favouriteCities.filter(
              (fav: weatherData) => fav.id !== city.id
            )
          : [...state.favouriteCities, city],
      };
    });
  },

  setInput: (value) => set({ input: value }),

  fetchWeatherByCity: async (city) => {
    if (!city.trim()) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchWeatherData(city);
      set({ weather: data, lastSearchedCity: city });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Failed to fetch the weather"),
      });
    } finally {
      setTimeout(() => {
        set({ loading: false });
      }, 1400);
    }
  },

  fetchCurrentLocatioWeather: async (coords: Coordinates) => {
    if (!coords) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchCurrentWeatherWithLatLon(coords);
      set((state) => ({
        weather: state.lastSearchedCity ? state.weather : data,
      }));
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Failed to fetch the weather"),
      });
    } finally {
      setTimeout(() => {
        set({ loading: false });
      }, 1400);
    }
  },

  fetchForcastWithLatLon: async (coords: Coordinates) => {
    if (!coords) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchWeatherForcast(coords);
      set((state) => ({
        forecast: state.lastSearchedCity ? state.forecast : data,
      }));
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Failed to fetch the weather"),
      });
    } finally {
      setTimeout(() => {
        set({ loading: false });
      }, 1400);
    }
  },

  fetchForcastWithCity: async (city) => {
    if (!city) return;
    set({ loading: true, error: null });

    try {
      const data = await fetchWeatherForcastByCityName(city);
      set({ forecast: data, lastSearchedCity: city });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Failed to fetch the weather"),
      });
    } finally {
      setTimeout(() => {
        set({ loading: false });
      }, 1400);
    }
  },
}));
