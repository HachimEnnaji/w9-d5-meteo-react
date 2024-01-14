import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

function Forecast() {
  const { lat, lon } = useParams();
  const [forecastData, setForecastData] = useState(null);

  const timeConverter = (data) => {
    let a = new Date(data * 1000);
    const date = a.getDate();
    let hour = a.getHours();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    if (hour + 2 === 24) hour = 0;
    if (hour < 9) hour = "0" + hour;
    return [date, hour, `${date} ${month}`];
  };

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

  return (
    <Container>
      <Carousel>
        {forecastData.list.map((dayForecast, index) => (
          <Carousel.Item key={`dayForecast${index}`}>
            <img src="https://placehold.co/600x400" alt="placeholder" />
            <Carousel.Caption>
              <h3>{timeConverter(dayForecast.dt)[2]}</h3>
              <p>{timeConverter(dayForecast.dt)[1]} : 00</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* <Card>
      <Card.Img variant="top"  />
      <Card.Body>
      <Card.Title>{timeConverter(dayForecast.dt)[2]}</Card.Title>
      <Card.Text>{timeConverter(dayForecast.dt)[1]}</Card.Text>
      </Card.Body>
  </Card> */}
    </Container>
  );
}

export default Forecast;
