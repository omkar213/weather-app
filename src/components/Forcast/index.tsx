import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { forcastDataProps } from "../../services/types";

interface WeatherforcastProps {
  data: forcastDataProps;
}

const ForcastContainer = ({ data }: WeatherforcastProps) => {
  const getFiveDaysForcast = () => {
    const dailyForcast = new Map<string, (typeof data.list)[number]>();

    data?.list?.forEach((item) => {
      const dateTime = item?.dt_txt;

      if (!dateTime) return;

      const [date, time] = dateTime.split(" ");

      if (time === "06:00:00" && !dailyForcast.has(date)) {
        dailyForcast.set(date, item);
      }
    });

    const dates = Array.from(dailyForcast.values());
    return dates;
  };

  const fiveDayForcastData = getFiveDaysForcast();
  // console.log(fiveDayForcastData);

  return (
    <div className="favourites-container">
      {fiveDayForcastData?.map((day) => (
        <div className="">
          <p>{day.dt_txt}</p>
          <p>{day.main?.temp_max}</p>
          <p>{day.main?.temp_min}</p>
          {day?.weather[0] && <p>{day?.weather[0]?.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default ForcastContainer;
