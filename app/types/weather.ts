export interface WeatherAlert {
  type: string;
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  start: number;
  end: number;
}

export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
  timestamp: number;
}

export interface ForecastData extends WeatherData {
  date: string;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastData[];
  hourly?: WeatherData[];
  alerts?: WeatherAlert[];
  units?: 'metric' | 'imperial';
} 