import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  getImageName,
  getUvHealthConcern,
  weatherDescription,
} from "../utils/helper";
import {
  isDaytime,
  getLongDayName,
  getShortDayName,
  getTime,
} from "../utils/timeConverter";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState();
  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [timeZone, setTimeZone] = useState();
  const [errCode, setErrCode] = useState();
  const [city, setCity] = useState();
  const [cityDescription, setCityDescription] = useState();
  const [lastSearch, setLastSearch] = useLocalStorage("lastSearch", {
    lat: null,
    lon: null,
    city: null,
  });

  const search = async (input1, input2 = null) => {
    const API_KEY1 = import.meta.env.VITE_API_KEY4;
    const API_KEY2 = import.meta.env.VITE_API_KEY4;
    const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;

    setIsLoading(true);
    try {
      let weatherAPI, geoAPI, forecastAPI, latitude, longitude, cityName;

      if (typeof input1 === "number" && typeof input2 === "number") {
        latitude = input1;
        longitude = input2;
        weatherAPI = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${API_KEY1}`;
        forecastAPI = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${API_KEY2}`;
        geoAPI = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEO_API_KEY}`;
      } else if (typeof input1 === "string") {
        cityName = input1;
        weatherAPI = `https://api.tomorrow.io/v4/weather/realtime?location=${cityName}&apikey=${API_KEY1}`;
        forecastAPI = `https://api.tomorrow.io/v4/weather/forecast?location=${cityName}&apikey=${API_KEY2}`;
        geoAPI = `https://api.geoapify.com/v1/geocode/search?text=${cityName}&apiKey=b93e0d1066234ebfb60fb1ffadef10d3`;
      } else {
        throw new Error(
          "Invalid input. Provide either a city name or latitude and longitude.",
        );
      }

      const [weatherResponse, forecastResponse, geoapiResponse] =
        await Promise.all([
          fetch(weatherAPI),
          fetch(forecastAPI),
          fetch(geoAPI),
        ]);

      if (!weatherResponse.ok) throw new Error(weatherResponse.status);

      const weatherData = await weatherResponse.json();

      const forecast = await forecastResponse.json();
      const geoData = await geoapiResponse.json();

      setTimeZone(geoData.features[0].properties.timezone.name);
      const { city, address_line1, lat, lon } = geoData.features[0].properties;
      setCity(city ? city : address_line1);
      setCityDescription(city ? address_line1 : "");

      // Update lastSearch state
      if (cityName) {
        setLastSearch({ city: cityName });
      } else {
        setLastSearch({ lat, lon });
      }

      // Update states
      setWeatherData(weatherData);
      setForecastData(forecast);
      setDailyData(forecast?.timelines?.daily.slice(1));
      setHourlyData(forecast?.timelines?.hourly.slice(1));
      setErrCode(null);
    } catch (error) {
      console.error("Search Error:", error);
      setErrCode(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (lastSearch?.city) {
      search(lastSearch.city);
    } else if (lastSearch?.lat && lastSearch?.lon) {
      search(lastSearch.lat, lastSearch.lon);
    } else {
      search("Mumbai");
    }
  }, []);

  let currentTime, sunRiseTime, sunSetTime;
  if (dailyData && weatherData) {
    currentTime = getTime(weatherData?.data.time, timeZone);
    sunRiseTime = getTime(dailyData[0]?.values?.sunriseTime, timeZone);
    sunSetTime = getTime(dailyData[0]?.values?.sunsetTime, timeZone);
  }

  const currentData = useMemo(() => {
    const isDayTime = isDaytime(currentTime, sunRiseTime, sunSetTime);
    const description =
      weatherDescription[weatherData?.data.values.weatherCode];

    return {
      dayName: getLongDayName(weatherData?.data.time, timeZone),
      shortDayName: getShortDayName(weatherData?.data.time, timeZone),
      time: currentTime,
      temperature: Math.round(weatherData?.data.values.temperature),
      maxTemp: Math.round(
        forecastData?.timelines?.daily[0].values.temperatureMax,
      ),
      minTemp: Math.round(
        forecastData?.timelines?.daily[0].values.temperatureMin,
      ),
      feelsLike: Math.round(weatherData?.data.values.temperatureApparent),
      uvIndex: weatherData?.data.values.uvIndex,
      uvHealthConcern: getUvHealthConcern(weatherData?.data.values.uvIndex),
      precipitationProbability: Math.round(
        weatherData?.data.values.precipitationProbability,
      ),

      humidity: Math.round(weatherData?.data.values.humidity),
      clouds: Math.round(weatherData?.data.values.cloudCover),
      visibility: Math.round(weatherData?.data.values.visibility),
      windSpeed: Math.round(weatherData?.data.values.windSpeed * 3.6),
      windDirection: weatherData?.data.values.windDirection,
      pressure: Math.round(weatherData?.data.values.pressureSurfaceLevel),
      rainIntensity: Math.round(weatherData?.data.values.rainIntensity),
      description: description,
      imageName: getImageName(description, isDayTime),
      sunRise: sunRiseTime,
      sunSet: sunSetTime,
      city: weatherData?.location.name,
      isDayTime: isDayTime,
    };
  }, [weatherData]);

  const getDailyData = (index) => {
    const description =
      weatherDescription[dailyData[index]?.values.weatherCodeMax];
    return {
      dayName: getLongDayName(dailyData[index]?.time, timeZone),
      temperature: Math.round(dailyData[index]?.values.temperatureAvg),
      maxTemp: Math.round(dailyData[index]?.values.temperatureMax),
      minTemp: Math.round(dailyData[index]?.values.temperatureMin),
      feelsLike: Math.round(dailyData[index]?.values.temperatureApparentAvg),
      uvIndex: dailyData[index]?.values.uvIndexAvg,
      uvHealthConcern: getUvHealthConcern(dailyData[index]?.values.uvIndexAvg),
      humidity: Math.round(dailyData[index]?.values.humidityAvg),
      clouds: Math.round(dailyData[index]?.values.cloudCoverAvg),
      visibility: Math.round(dailyData[index]?.values.visibilityAvg),
      windSpeed: Math.round(dailyData[index]?.values.windSpeedAvg * 3.6),
      windDirection: dailyData[index]?.values.windDirectionAvg + 180,
      pressure: Math.round(dailyData[index]?.values.pressureSurfaceLevelAvg),
      rainIntensity: Math.round(dailyData[index]?.values.rainIntensityAvg),
      precipitationProbability: Math.round(
        dailyData[index]?.values.precipitationProbabilityAvg,
      ),
      description: description,
      imageName: getImageName(description, true),
      sunRise: getTime(dailyData[index]?.values.sunriseTime, timeZone),
      sunSet: getTime(dailyData[index]?.values.sunsetTime, timeZone),
    };
  };
  const getHourlyData = (index) => {
    const day = getShortDayName(hourlyData[index]?.time, timeZone);
    const time = getTime(hourlyData[index]?.time, timeZone);
    const isDayTime = isDaytime(time, sunRiseTime, sunSetTime);
    const description =
      weatherDescription[hourlyData[index]?.values.weatherCode];
    return {
      dayName: currentData?.shortDayName === day ? "" : day,
      time: time,
      temperature: Math.round(hourlyData[index]?.values.temperature),
      feelsLike: Math.round(hourlyData[index]?.values.temperatureApparent),
      uvIndex: hourlyData[index]?.values.uvIndex,
      uvHealthConcern: getUvHealthConcern(hourlyData[index]?.values.uvIndex),
      precipitationProbability: Math.round(
        hourlyData[index]?.values.precipitationProbability,
      ),
      humidity: Math.round(hourlyData[index]?.values.humidity),
      clouds: Math.round(hourlyData[index]?.values.cloudCover),
      visibility: Math.round(hourlyData[index]?.values.visibility),
      windSpeed: Math.round(hourlyData[index]?.values.windSpeed * 3.6),
      windDirection: hourlyData[index]?.values.windDirection,
      pressure: Math.round(hourlyData[index]?.values.pressureSurfaceLevel),
      rainIntensity: Math.round(hourlyData[index]?.values.rainIntensity),
      description: description,
      imageName: getImageName(description, isDayTime),
      isDayTime: isDayTime,
    };
  };

  return (
    <ApiContext.Provider
      value={{
        city,
        search,
        errCode,
        timeZone,
        isLoading,
        dailyData,
        hourlyData,
        currentData,
        weatherData,
        getDailyData,
        getHourlyData,
        cityDescription,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiData = () => useContext(ApiContext);
