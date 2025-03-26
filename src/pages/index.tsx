import { useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import { useGeoLocation } from "../hooks/useGeoLocation";

// Component Imports
import { useWeatherStore } from "../state/useWeatherStore";
import TempCard from "../components/TempCard";
import WeatherLocation from "../components/WeatherLocation";
import ForcastContainer from "../components/Forcast";
import FavouriteCityContainer from "../components/FavouriteCityContainer";
import { ThemeToggle } from "../components/ThemeToggle";

const WeatherDashboard = () => {
  const {
    weather,
    forecast,
    input,
    lastSearchedCity,
    setInput,
    fetchWeatherByCity,
    fetchCurrentLocatioWeather,
    fetchForcastWithLatLon,
    fetchForcastWithCity,
    loading,
    error,
  } = useWeatherStore();

  const { coordinates, geoLocationerror, getGeoLocation } = useGeoLocation();

  // Handle manual search
  const handleSearch = () => {
    if (!input.trim()) return;
    if (input.trim()) {
      setInput("");
      fetchWeatherByCity(input);
      fetchForcastWithCity(input);
    }
  };

  // Fetch weather by current location initially
  useEffect(() => {
    if (coordinates && !lastSearchedCity) {
      fetchCurrentLocatioWeather(coordinates);
      fetchForcastWithLatLon(coordinates);
    }
  }, [
    coordinates,
    fetchCurrentLocatioWeather,
    fetchForcastWithLatLon,
    lastSearchedCity,
  ]);

  return (
    <div>
      <header className="header">
        <div className="header-container">
          <h1 className="title">Weather Dashboard</h1>

          <div className="header-actions">
            <div className="search-form">
              <input
                type="search"
                placeholder="Search City..."
                className="search-input"
                id="search-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button
                className="search-btn"
                disabled={loading}
                onClick={handleSearch}
              >
                {loading ? "Searching" : "Search"}
              </button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="weather-data-container">
          {loading ? (
            <div className="loading-indicator">
              <div className="loader"></div>
            </div>
          ) : error || geoLocationerror ? (
            <div className="error-message">
              {error ? error : geoLocationerror}
              {geoLocationerror && (
                <button className="refetch-btn" onClick={getGeoLocation}>
                  Refetch
                </button>
              )}
            </div>
          ) : (
            <>
              <WeatherLocation data={weather} />

              <div className="weather-info-container">
                <WeatherCard data={weather} />
                <TempCard data={weather} />
              </div>

              <ForcastContainer data={forecast} />
            </>
          )}
        </div>

        <FavouriteCityContainer />
      </div>
    </div>
  );
};

export default WeatherDashboard;
