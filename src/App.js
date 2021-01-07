import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  // states
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  useEffect(() => {
    const success = (position) => {
      console.log(position);
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    };
    const error = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  return (
    <div className="App">
      <h2>longitude: {longitude}</h2>
      <h2>latitude: {latitude}</h2>
    </div>
  );
}

export default App;
