import { weatherData } from "../../services/types";
import { useState } from "react";

interface currentWeatherProps {
  data: weatherData;
}

const getCountryName = (code: string) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const WeatherCard = ({ data }: currentWeatherProps) => {
  const [unit, setUnit] = useState("F");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const countryName = getCountryName(data?.sys?.country);

  return <div className="weather-card"></div>;
};

export default WeatherCard;
