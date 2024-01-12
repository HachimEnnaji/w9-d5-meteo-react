import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function Forecast() {
  const { lat, lon } = useParams();
  const [forecastData, setForecastData] = useState(null);
  console.log(forecastData);
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const token = "4c67e6677a48d9f7e61fcbff458ccff4";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${token}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Errore nella richiesta API");
        }

        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Errore durante la richiesta API:", error);
      }
    };

    fetchForecastData();
  }, [lat, lon]);

  if (!forecastData) {
    return <p>Caricamento...</p>;
  }

  return <div></div>;
}
export default Forecast;
