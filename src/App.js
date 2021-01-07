import "./App.css";
import React, { useState, useEffect } from "react";
import WeatherDisplay from "./components/DisplayWeather";
function App() {
  // states
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [tempC, setTempC] = useState(null);
  const [tempF, setTempF] = useState(null);
  const [icon, updateIcon] = useState(null);

  useEffect(() => {
    const success = (position) => {
      console.log(position);
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      getWeather(position.coords.latitude, position.coords.longitude);
      // console.log("lat:", position.coords.latitude);
    };
    const error = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const getWeather = async (latitude, longitude) => {
    const API_KEY = "b1c955660ab089da9de517056d750831";
    // const apiRoot = "https://openweathermap.org/current";
    const url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    console.log(url);
    let response = await fetch(url);
    let dataObj = await response.json();
    console.log("data", dataObj);
    // write the data to the state
    setWeatherData(dataObj);
    console.log("temp", dataObj.main.temp);
    getTempC(dataObj);
    getTempF(dataObj);
    getIcon(dataObj);
  };

  const getTempC = (dataObj) => {
    let c = dataObj.main.temp - 273.15;
    setTempC(c);
    // console.log("updateTempC", c);
  };

  const getTempF = (dataObj) => {
    let f = ((dataObj.main.temp - 273.15) * 9) / 5 + 32;
    setTempF(f);
    // console.log("updateTempF", f);
  };

  const getIcon = (data) => {
    let iconCode = data.weather[0].icon;
    updateIcon(`http://openweathermap.org/img/wn/${iconCode}.png`);
    console.log("iconcode", iconCode);
    console.log(`http://openweathermap.org/img/wn/${iconCode}.png`);
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <WeatherDisplay
        city={weatherData.name}
        country={weatherData.sys.country}
        tempC={tempC}
        tempF={tempF}
        description={weatherData.weather[0].description}
        icon={icon}
      />
    </div>
  );
}
export default App;

// useEffect(() => {
//   if (latitude && longitude) {
//     getWeather();
//   }
// }, [latitude, longitude]);
{
  /* <h2>longitude: {longitude}</h2>
      <h2>latitude: {latitude}</h2> */
}
