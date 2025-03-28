import { Star } from "lucide-react";
import { weatherData } from "../services/types";
import { useWeatherStore } from "../state/useWeatherStore";
import { useState } from "react";

interface currentWeatherProps {
  data: weatherData | null;
}

const WeatherCard = ({ data }: currentWeatherProps) => {
  const [unit, setUnit] = useState("C");

  const { favouriteCities, toggleFavouriteCity } = useWeatherStore();

  if (!data) {
    return (
      <div className="weather-card loading">
        <p>Loading weather data...</p>
      </div>
    );
  }

  const { main, weather, wind } = data;

  // weather image icon according to weather
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  // Toggle Temp Metric
  const handleTempConvert = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  // Convert temp to Celcius from Farenheit & vice-versa
  const convertTemp = (temp: number) => {
    return unit === "C" ? temp - 273.15 : ((temp - 273.15) * 9) / 5 + 32;
  };

  const isFavorite = favouriteCities.some((fav) => fav.id === data.id);

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <button onClick={handleTempConvert}>
          Convert to {unit === "C" ? "F" : "C"}
        </button>
        <Star
          size={24}
          onClick={() => toggleFavouriteCity(data)}
          className={`star-icon ${isFavorite ? "favorite" : ""}`}
        />
      </div>
      <div className="d-flex">
        <h1 className="flex-grow-1">
          <span>{convertTemp(main.temp).toFixed(0)}</span>°<span>{unit}</span>
        </h1>

        <h3 className="text-end">
          <small style={{ marginRight: "8px" }}>High</small>
          <span className="temps">{convertTemp(main.temp_max).toFixed(0)}</span>
          °<span>{unit}</span>
          <br />
          <small style={{ marginRight: "8px" }}>Low</small>
          <span className="temps">{convertTemp(main.temp_min).toFixed(0)}</span>
          °<span>{unit}</span>
        </h3>
      </div>
      <br />
      <div className="d-flex">
        <div className="flex-grow-1">
          <p style={{ textTransform: "capitalize" }}>
            <span>{weather[0].description}</span>
            <br />
            Feels like{" "}
            <span className="temps">
              {convertTemp(main.feels_like).toFixed(1)}
            </span>
            °<span>{unit}</span>
            <br />
            <span>wind Speed</span>
            <span style={{ marginLeft: "4px" }}>{wind?.speed}</span>
          </p>
        </div>
        <div>
          <img src={weatherIconUrl} alt={weather[0].description} width="85" />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
