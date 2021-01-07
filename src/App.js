import "./App.css";
import React, { useState, useEffect } from "react";
import WeatherDisplay from "./components/DisplayWeather";
function App() {
  // states
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [data, setData] = useState(null);
  const [tempC, updateTempC] = useState(null);
  const [tempF, updateTempF] = useState(null);
  const [icon, updateIcon] = useState(null);

  useEffect(() => {
    const success = (position) => {
      console.log(position);
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      getWeather(position.coords.latitude, position.coords.longitude);
      getTempC(data);
      getTempF(data);
      getIcon(data);
      console.log("lat:", position.coords.latitude);
    };
    const error = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const getWeather = async (latitude, longitude) => {
    const API_KEY = "b1c955660ab089da9de517056d750831";
    // const apiRoot = "https://openweathermap.org/current";
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    // write the data to the state
    setData(data);
    console.log("weather", data.main.temp);
  };

  const getTempC = (data) => {
    let c = data.main.temp - 273.15;
    updateTempC(c);
    console.log("updateTempC", c);
  };

  const getTempF = (data) => {
    let f = ((data.main.temp - 273.15) * 9) / 5 + 32;
    updateTempF(f);
    console.log("updateTempF", f);
  };

  const getIcon = (data) => {
    let iconCode = data.weather[0].icon;
    updateIcon(`http://openweathermap.org/img/wn/${iconCode}.png`);
    console.log("iconcode", iconCode);
    console.log(`http://openweathermap.org/img/wn/${iconCode}.png`);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <WeatherDisplay
        city={data.name}
        tempC={tempC}
        tempF={tempF}
        description={data.weather[0].description}
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
