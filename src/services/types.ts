export interface Coordinates {
  lon: number;
  lat: number;
}

export interface weatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface weatherData {
  coord: Coordinates;
  weather: weatherCondition[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
  };
  visibility?: number;
  wind?: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface weatherCardProps {
  id: string; //
  city: string;
  country: string;
  temperature: number;
  unit: string;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string; // Weather icon
}

export interface forcastDataProps {
  city: {
    coord: Coordinates;
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  list: Array<{
    dt?: number;
    dt_txt?: string;
    main?: weatherData["main"];
    // sys?: weatherData["sys"];
    weather?: weatherData["weather"];
    wind?: weatherData["wind"];
  }>;
}

export interface WeatherStore {
  weather: weatherData | null;
  forecast: forcastDataProps | null;
  input: string;
  error: string | null;
  loading: boolean;
  coordinates: Coordinates | null;
  theme: string;
  favouriteCities: weatherData[];
  lastSearchedCity: string;
  setTheme: (theme: string) => void;
  setInput: (value: string) => void;
  toggleFavouriteCity: (city: weatherData) => void;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchCurrentLocatioWeather: (coords: Coordinates) => Promise<void>;
  fetchForcastWithLatLon: (coords: Coordinates) => Promise<void>;
  fetchForcastWithCity: (city: string) => Promise<void>;
}
