import { useEffect, useState } from "react";
import { useWeatherStore } from "../state/useWeatherStore";
import { getCountryName } from "../utils";

const FavouriteCityContainer = () => {
  const [unit] = useState("C");
  const { favouriteCities } = useWeatherStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (favouriteCities.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [favouriteCities]);

  const convertTemp = (temp: number) => {
    return unit === "C" ? temp - 273.15 : ((temp - 273.15) * 9) / 5 + 32;
  };

  return (
    <div className="favourite-cities-container">
      <h2 className="fav-title">Forecast in your Favourite Cities</h2>

      {loading ? (
        <p>Loading favourite cities...</p>
      ) : favouriteCities.length === 0 ? (
        <p>No favorite cities added.</p>
      ) : (
        <div className="items-wrapper">
          {favouriteCities.map((city, index) => (
            <div key={index} className="fav-item-container">
              <div>
                <p>{city?.name}</p>
                <p>{getCountryName(city?.sys?.country)}</p>
              </div>
              {city?.weather[0]?.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${city?.weather[0]?.icon}@2x.png`}
                  alt={city?.weather[0]?.description}
                />
              )}
              <div>
                <span>{convertTemp(city?.main?.temp).toFixed(0)}</span>°
                <span>{unit}</span>
                <p>{city?.weather[0]?.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteCityContainer;
