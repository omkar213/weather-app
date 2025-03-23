import { useEffect, useState } from "react";
import WeatherCard from "../components/weatherCard/WeatherCard";
import { forcastDataProps, weatheData } from "../services/types";
import useDebounce from "../hooks/useDebounce";
import { useGeoLocation } from "../hooks/useGeoLocation";
import ForcastContainer from "../components/Forcast";

//dummy imports
import { forcastDummyData } from "../data/forcast";
import { useWeatherStore } from "../state/useWeatherStore";
import { weatherData } from "../data/weather";

const WeatherDashboard = () => {
  const {
    weather,
    forecast,
    input,
    setInput,
    error,
    loading,
    fetchWeatherByCity,
    fetchCurrentLocatioWeather,
    fetchForcastWithLatLon,
    fetchForcastWithCity,
  } = useWeatherStore();

  const { coordinates, geoLocationerror, getGeoLocation, isLoading } =
    useGeoLocation();

  const debouncedCityValue = useDebounce(input, 1500);

  // fetching weatherByCity
  // useEffect(() => {
  //   if (debouncedCityValue) {
  //     fetchWeatherByCity(debouncedCityValue);
  //     fetchForcastWithCity(debouncedCityValue);
  //   }
  // }, [debouncedCityValue, fetchWeatherByCity, fetchForcastWithCity]);

  // fetching weather by current location with geoApi
  // useEffect(() => {
  //   if (coordinates) {
  //     fetchCurrentLocatioWeather(coordinates);
  //     fetchForcastWithLatLon(coordinates);
  //   }
  // }, [coordinates, fetchCurrentLocatioWeather, fetchForcastWithLatLon]);

  return (
    <div className="dashboard-container">
      <div className="city-weather-data-container">
        <div className="">
          <input
            id="search"
            type="text"
            className="search-input"
            name="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the Name of City"
          />
        </div>
        <div className="weather-card-container">
          {/* {weather ? <WeatherCard data={weather} /> : "No Data Available"} */}
          <WeatherCard data={weatherData[0]} />
          {/* <div className="local-weather-card"></div> */}
        </div>
      </div>

      <div className="dashboard-feature-container">
        {/* {forecast && <ForcastContainer data={forecast} />} */}
        <ForcastContainer data={forcastDummyData[0]} />
        <div className="week-days-forcast-container"></div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
