import { weatherData } from "../services/types";
import { getCountryName } from "../utils";
import moment from "moment";

interface currentWeatherProps {
  data: weatherData | null;
}

const WeatherLocation = ({ data }: currentWeatherProps) => {
  if (!data) return <p>Loading...</p>;

  const { name, sys } = data;

  const countryName = getCountryName(sys?.country);

  const date = new Date();
  const formattedDate = moment(date).format("dddd, MMMM DD [at] hh:mm A");

  return (
    <div className="weather-location">
      <h2>
        Forecast in{" "}
        <span id="location">
          {name}, {countryName}
        </span>
      </h2>
      <h3 id="today">{formattedDate}</h3>
    </div>
  );
};

export default WeatherLocation;
