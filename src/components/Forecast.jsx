import React from "react";
import { Carousel, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { MdCalendarToday } from "react-icons/md";
import { TbClockHour9, TbTemperature } from "react-icons/tb";
import { RiCelsiusFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";
import UseFetch from "../hooks/fetch.hook";

const TOKEN = "4c67e6677a48d9f7e61fcbff458ccff4";

function Forecast({ place }) {
  const { lat, lon, city } = useParams();

  const { data, error, loading } = UseFetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${TOKEN}&units=metric`
  );

  const timeConverter = (data) => {
    let a = new Date(data * 1000);
    const date = a.getDate();
    let hour = a.getHours();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[a.getMonth()];
    if (hour < 9) hour = "0" + hour;
    return [date, hour, `${date} ${month}`];
  };

  if (loading) {
    return <Spinner animation="grow" variant="success" />;
  }

  if (error) {
    return <p>Errore nel caricamento: {error.message}</p>;
  }

  if (!data || !data.list) {
    return <p>Nessun dato disponibile.</p>;
  }
  if (data) {
    console.log(data);
  }
  return (
    <Container className="background-city">
      <div className="forecast-format text-white ">
        <h2>{` ${place?.name || city}  ${place?.state ? "• " + place.state : ""} `}</h2>
      </div>
      {data &&
        data.list.map((dayForecast, index) => (
          <div key={`dayForecast${index}`} className="my-3">
            <div className="forecast-format">
              <h3>
                <MdCalendarToday /> {timeConverter(dayForecast.dt)[2]} <TbClockHour9 />{" "}
                {timeConverter(dayForecast.dt)[1]}:00
              </h3>
              <img src={`https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`} alt="" />
              <h4>
                <TbTemperature /> {Math.round(dayForecast.main.temp)} <RiCelsiusFill />
              </h4>
              <h4>
                <WiHumidity /> {dayForecast.main.humidity} % - <GiWindsock /> {dayForecast.wind.speed} Km/h
              </h4>
            </div>
          </div>
        ))}
    </Container>
  );
}

export default Forecast;
