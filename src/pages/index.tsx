import { useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import useDebounce from "../hooks/useDebounce";
import { useGeoLocation } from "../hooks/useGeoLocation";

//dummy imports
import { useWeatherStore } from "../state/useWeatherStore";
import TempCard from "../components/TempCard";
import WeatherLocation from "../components/WeatherLocation";
import ForcastContainer from "../components/Forcast";

const WeatherDashboard = () => {
  const {
    weather,
    forecast,
    input,
    fetchWeatherByCity,
    fetchCurrentLocatioWeather,
    fetchForcastWithLatLon,
    fetchForcastWithCity,
  } = useWeatherStore();

  const { coordinates, geoLocationerror, getGeoLocation, isLoading } =
    useGeoLocation();

  const debouncedCityValue = useDebounce(input, 1500);

  // fetching weatherByCity
  useEffect(() => {
    if (debouncedCityValue) {
      fetchWeatherByCity(debouncedCityValue);
      fetchForcastWithCity(debouncedCityValue);
    }
  }, [debouncedCityValue, fetchWeatherByCity, fetchForcastWithCity]);

  // fetching weather by current location with geoApi
  useEffect(() => {
    if (coordinates) {
      fetchCurrentLocatioWeather(coordinates);
      fetchForcastWithLatLon(coordinates);
    }
  }, [coordinates, fetchCurrentLocatioWeather, fetchForcastWithLatLon]);

  return (
    <div className="dashboard-container">
      <div className="weather-data-container">
        <WeatherLocation data={weather} />

        <div className="weather-info-container">
          <WeatherCard data={weather} />
          <TempCard data={weather} />
        </div>

        <ForcastContainer data={forecast} />
      </div>

      <div className="favourite-cities-container"></div>
    </div>
  );
};

export default WeatherDashboard;
