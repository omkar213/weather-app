import {
  Droplet,
  EyeOff,
  ThermometerSnowflake,
  Waves,
  WindArrowDown,
} from "lucide-react";
import { weatherData } from "../services/types";
import { useWeatherStore } from "../state/useWeatherStore";

interface currentWeatherProps {
  data: weatherData | null;
}

const TempCard = ({ data }: currentWeatherProps) => {
  const { theme } = useWeatherStore();
  return (
    <div className="temp-card">
      <div className="d-flex temp-card-info">
        <p style={{ fontWeight: 500 }}>Visibility</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p style={{ fontWeight: 500 }}>{data?.visibility}Km</p>
          <EyeOff size={18} color={theme === "light" ? "green" : "white"} />
        </div>
      </div>
      <div className="d-flex temp-card-info">
        <p style={{ fontWeight: 500 }}>Humidity</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p style={{ fontWeight: 500 }}>{data?.main?.humidity}%</p>
          <Droplet size={18} color={theme === "light" ? "green" : "white"} />
        </div>
      </div>
      <div className="d-flex temp-card-info">
        <p style={{ fontWeight: 500 }}>Pressure</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p style={{ fontWeight: 500 }}>{data?.main?.pressure}p</p>
          <WindArrowDown
            size={18}
            color={theme === "light" ? "green" : "white"}
          />
        </div>
      </div>
      <div className="d-flex temp-card-info">
        <p style={{ fontWeight: 500 }}>Sea Level</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p style={{ fontWeight: 500 }}>{data?.main?.sea_level}Km</p>
          <Waves size={18} color={theme === "light" ? "green" : "white"} />
        </div>
      </div>
      <div className="d-flex temp-card-info">
        <p style={{ fontWeight: 500 }}>Feels Like</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p style={{ fontWeight: 500 }}>{data?.main?.feels_like}°C</p>
          <ThermometerSnowflake
            size={18}
            color={theme === "light" ? "green" : "white"}
          />
        </div>
      </div>
    </div>
  );
};

export default TempCard;
