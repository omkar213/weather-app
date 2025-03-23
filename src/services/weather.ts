import { Coordinates } from "./types";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
// const GEO_BASE_URL = "http://api.openweathermap.org/geo/1.0/reverse";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherData = async (city: string) => {
  const response = await axios.get(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`
  );

  if (response.statusText !== "OK") {
    throw new Error(`Weather Api Error: ${response.statusText}`);
  }
  return response.data;
};

export const fetchCurrentWeatherWithLatLon = async ({
  lat,
  lon,
}: Coordinates) => {
  const response = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (response.statusText !== "OK") {
    throw new Error(`Fetch GeoLocation Api Error: ${response.statusText}`);
  }

  return response.data;
};

export const fetchWeatherForcast = async ({ lat, lon }: Coordinates) => {
  const response = await axios.get(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (response.statusText !== "OK") {
    throw new Error(`Fetch GeoLocation Api Error: ${response.statusText}`);
  }
  return response.data;
};

export const fetchWeatherForcastByCityName = async (city: string) => {
  const response = await axios.get(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`
  );

  if (response.statusText !== "OK") {
    throw new Error(`Fetch GeoLocation Api Error: ${response.statusText}`);
  }

  return response.data;
};
