import moment from "moment";
import { forcastDataProps } from "../../services/types";

interface WeatherforcastProps {
  data: forcastDataProps | null;
}

const ForcastContainer = ({ data }: WeatherforcastProps) => {
  const getFiveDaysForcast = () => {
    if (!data || !data.list) return [];
    const dailyForcast = new Map<string, (typeof data.list)[number]>();

    data?.list?.forEach((item) => {
      const dateTime = item?.dt_txt;
      if (!dateTime) return;

      const [date, time] = dateTime.split(" ");

      if (time === "12:00:00" && !dailyForcast.has(date)) {
        dailyForcast.set(date, item);
      }
    });

    return Array.from(dailyForcast.values());
  };

  const fiveDayForcastData = getFiveDaysForcast();

  //convert to dayName
  function convertDateToDay(date: string | undefined) {
    if (date) {
      const dayName = moment(date).format("ddd");
      return dayName;
    }
  }

  // get icon url
  function iconUrl(icon: string | undefined) {
    if (icon) {
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      return iconUrl;
    }
  }

  const convertTemperature = (temp: number | undefined) =>
    temp ? (temp - 273.15).toFixed(0) : "--";

  return (
    <div className="forcast-container">
      {fiveDayForcastData.map((dayData, index) => {
        return (
          <div className="day-weather-card" key={index}>
            <h4>{convertDateToDay(dayData?.dt_txt)}</h4>
            <img
              src={
                dayData?.weather?.[0] ? iconUrl(dayData?.weather?.[0].icon) : ""
              }
              alt={dayData.weather?.[0].description}
              width="50"
            />
            <p className="high-temp">
              {convertTemperature(dayData.main?.temp_max)}°C
            </p>
            <p className="low-temp">
              {convertTemperature(dayData.main?.temp_min)}°C
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ForcastContainer;
