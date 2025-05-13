export interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  cityName: string;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  date: number;
  temperature: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
}

export interface HourlyData {
  time: number;
  temperature: number;
  description: string;
  icon: string;
}

const mockWeatherData: Record<string, WeatherData> = {
  london: {
    temperature: 18,
    feelsLike: 16,
    description: "partly cloudy",
    icon: "02d",
    humidity: 65,
    windSpeed: 12,
    pressure: 1015,
    visibility: 10000,
    cityName: "London",
    sunrise: Math.floor(Date.now() / 1000) + 21600,
    sunset: Math.floor(Date.now() / 1000) + 72000,
  },
  "new york": {
    temperature: 25,
    feelsLike: 27,
    description: "clear sky",
    icon: "01d",
    humidity: 45,
    windSpeed: 8,
    pressure: 1012,
    visibility: 10000,
    cityName: "New York",
    sunrise: Math.floor(Date.now() / 1000) + 21600,
    sunset: Math.floor(Date.now() / 1000) + 72000,
  },
  tokyo: {
    temperature: 28,
    feelsLike: 30,
    description: "light rain",
    icon: "10d",
    humidity: 75,
    windSpeed: 15,
    pressure: 1008,
    visibility: 8000,
    cityName: "Tokyo",
    sunrise: Math.floor(Date.now() / 1000) + 21600,
    sunset: Math.floor(Date.now() / 1000) + 72000,
  },
  sydney: {
    temperature: 22,
    feelsLike: 23,
    description: "scattered clouds",
    icon: "03d",
    humidity: 55,
    windSpeed: 20,
    pressure: 1020,
    visibility: 10000,
    cityName: "Sydney",
    sunrise: Math.floor(Date.now() / 1000) + 21600,
    sunset: Math.floor(Date.now() / 1000) + 72000,
  },
  dubai: {
    temperature: 35,
    feelsLike: 38,
    description: "sunny",
    icon: "01d",
    humidity: 30,
    windSpeed: 10,
    pressure: 1010,
    visibility: 10000,
    cityName: "Dubai",
    sunrise: Math.floor(Date.now() / 1000) + 21600,
    sunset: Math.floor(Date.now() / 1000) + 72000,
  }
};

export function getMockWeatherData(city: string, units: 'metric' | 'imperial' = 'metric'): WeatherData {
  const normalizedCity = city.toLowerCase().trim();
  const cityData = mockWeatherData[normalizedCity] || mockWeatherData.london;
  
  if (units === 'imperial') {
    return {
      ...cityData,
      temperature: celsiusToFahrenheit(cityData.temperature),
      feelsLike: celsiusToFahrenheit(cityData.feelsLike),
      windSpeed: kilometersToMiles(cityData.windSpeed),
    };
  }
  
  return cityData;
}

export function getMockForecast(city: string, units: 'metric' | 'imperial' = 'metric'): ForecastData[] {
  const baseTemp = mockWeatherData[city.toLowerCase().trim()]?.temperature || 20;
  
  return Array.from({ length: 5 }, (_, i) => ({
    date: Math.floor(Date.now() / 1000) + (i + 1) * 86400,
    temperature: baseTemp + Math.floor(Math.random() * 5) - 2,
    tempMin: baseTemp - Math.floor(Math.random() * 5),
    tempMax: baseTemp + Math.floor(Math.random() * 5),
    description: "partly cloudy",
    icon: "02d"
  })).map(forecast => units === 'imperial' ? {
    ...forecast,
    temperature: celsiusToFahrenheit(forecast.temperature),
    tempMin: celsiusToFahrenheit(forecast.tempMin),
    tempMax: celsiusToFahrenheit(forecast.tempMax),
  } : forecast);
}

export function getMockHourlyForecast(city: string, units: 'metric' | 'imperial' = 'metric'): HourlyData[] {
  const baseTemp = mockWeatherData[city.toLowerCase().trim()]?.temperature || 20;
  
  return Array.from({ length: 12 }, (_, i) => ({
    time: Math.floor(Date.now() / 1000) + i * 3600,
    temperature: baseTemp + Math.floor(Math.random() * 5) - 2,
    description: "partly cloudy",
    icon: "02d"
  })).map(hour => units === 'imperial' ? {
    ...hour,
    temperature: celsiusToFahrenheit(hour.temperature),
  } : hour);
}

function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32);
}

function kilometersToMiles(kilometers: number): number {
  return Math.round(kilometers * 0.621371);
} 