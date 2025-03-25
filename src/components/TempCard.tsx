import { weatherData } from "../services/types";

interface currentWeatherProps {
  data: weatherData | null;
}

const TempCard = ({ data }: currentWeatherProps) => {
  if (!data) return <p>Loading...</p>;

  const { main, visibility } = data;

  return (
    <div className="temp-card">
      <div className="d-flex temp-card-info">
        <p>Visibility</p>
        <p>{visibility}Km</p>
      </div>
      <div className="d-flex temp-card-info">
        <p>Humidity</p>
        <p>{main?.humidity}%</p>
      </div>
      <div className="d-flex temp-card-info">
        <p>Pressure</p>
        <p>{main?.pressure}p</p>
      </div>
      <div className="d-flex temp-card-info">
        <p>Sea Level</p>
        <p>{main?.sea_level}Km</p>
      </div>
    </div>
  );
};

export default TempCard;
