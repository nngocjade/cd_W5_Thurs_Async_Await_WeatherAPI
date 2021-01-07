import React from "react";

// Write a component to get data and display data results
// city
// data.main in C and F
// data.weather[0].indexOf(2) - description: "scattered clouds"
// sys[2] - country: "vn"
//sys[3] - sunrise
//sys[4] - sunset

const DisplayWeather = (props) => {
  return (
    <div className={`display-weather`}>
      <div>
        <h1 className={"city"}>
          {props.city}, {props.country}
        </h1>
      </div>
      <div>
        <h2 className={"temp"}>
          {props.tempC}
          {"\u00b0"}C - {props.tempF}
          {"\u00b0"}F
        </h2>
      </div>
      <div className={"weather-des-img"}>
        <h1 className={"description"}>{props.description}</h1>
        <img id={"weatherIcon"} src={props.icon} alt="current weather icon" />
      </div>
    </div>
  );
};

export default DisplayWeather;
