import React, { useState } from "react";
import "./index.css";
import bgmain from "./img/bgmain.jpg";
import clear from "./img/clear.jpg";
import clouds from "./img/clouds.jpg";
import drizzle from "./img/drizzle.jpg";
import mist from "./img/mist.jpg";
import rainy from "./img/rainy.jpg";
import snow from "./img/snow.jpg";
import sunny from "./img/sunny.jpg";
import thunderstorm from "./img/thunderstorm.jpg";

const weatherApi = {
  key: "secret",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState(`url(${bgmain})`);

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      getWeatherReport(city);
    }
  };

  const changeBackground = (status) => {
    const backgrounds = {
      Clouds: `url(${clouds})`,
      Rain: `url(${rainy})`,
      Clear: `url(${clear})`,
      Snow: `url(${snow})`,
      Sunny: `url(${sunny})`,
      Thunderstorm: `url(${thunderstorm})`,
      Drizzle: `url(${drizzle})`,
      Mist: `url(${mist})`,
      Haze: `url(${mist})`,
      Fog: `url(${mist})`,
    };
    setBackground(backgrounds[status] || `url(${bgmain})`);
  };

  const getWeatherReport = async (city) => {
    try {
      const response = await fetch(
        `${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
      );
      const data = await response.json();
      if (data.cod === "400") {
        alert("Empty Input: Please enter a city.");
        resetInput();
      } else if (data.cod === "404") {
        alert("Bad Input: Entered city didn't match.");
        resetInput();
      } else {
        setWeather(data);
        changeBackground(data.weather[0].main);
        resetInput();
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const resetInput = () => {
    setCity("");
  };

  const dateManage = (dateArg) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = dateArg.getFullYear();
    const month = months[dateArg.getMonth()];
    const date = dateArg.getDate();
    const day = days[dateArg.getDay()];
    return `${date} ${month} ${day} ${year}`;
  };

  const getTIme = (dateArg) => {
    const addZero = (i) => (i < 10 ? "0" + i : i);
    const hour = addZero(dateArg.getHours());
    const minute = addZero(dateArg.getMinutes());
    return `${hour}:${minute}`;
  };
  console.log(weather);
  return (
    <div
      className="weather-app"
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: 10,
      }}
    >
      <div className="app-main" id="parent">
        <div className="header">
          <h4>Get Weather</h4>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        {weather?.main && (
          <div className="weather-body">
            <div className="location-details">
              <div className="city">
                {weather.name}, {weather.sys.country}{" "}
              </div>
              <div className="date">{dateManage(new Date())}</div>
            </div>
            <div className="weather-status">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="min-max">
                {Math.floor(weather.main.temp_min)}°C (min) /{" "}
                {Math.ceil(weather.main.temp_max)}°C (max)
              </div>
              <div id="updated_on"> Updated as of {getTIme(new Date())}</div>
            </div>
            <div className="day-details">
              Feels like {weather.main.feels_like}°C | Humidity{" "}
              {weather.main.humidity}% <br />
              Pressure {weather.main.pressure} mb | Wind {weather.wind.speed}{" "}
              KMPH
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
