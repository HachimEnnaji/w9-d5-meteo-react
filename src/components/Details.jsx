// Details.jsx
import React, { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { TbTemperatureCelsius } from "react-icons/tb";
import { LuWind } from "react-icons/lu";
import { TbTemperature } from "react-icons/tb";
function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const cityName = location.pathname.replace("/Details/", "");
  const [hasData, setHasData] = useState(true);
  const [cityData, setCityData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const thunderstorm200 =
    "https://www.shutterstock.com/image-vector/realistic-illustration-autumn-night-rain-600nw-1932348497.jpg";
  const drizzle300 =
    "https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-rainy-weather-image_795021.jpg";
  const rain500 = "https://as1.ftcdn.net/v2/jpg/02/24/92/60/1000_F_224926031_mGoiNVsqk5jTsQwRvAdKlbdYwdZo4zFg.jpg";
  const snow600 = "https://as1.ftcdn.net/v2/jpg/01/25/88/86/1000_F_125888672_dXvMzyajKbribAJj2tY2PMDfTnGydx76.jpg";
  const fog700 =
    "https://images.unsplash.com/photo-1578390986741-4e08df07e94b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9nZ3klMjB3ZWF0aGVyfGVufDB8fDB8fHww";
  const clear800d = "https://img.freepik.com/premium-photo/sunny-sky-with-clouds_87394-1064.jpg";
  const clear800n = "https://c4.wallpaperflare.com/wallpaper/996/262/558/sky-clouds-sun-light-wallpaper-preview.jpg";
  const cloud801 = "https://i.pinimg.com/originals/cb/6d/2c/cb6d2c974f71580b964c1f931e8b2aa3.jpg";

  const getBackgroundImageUrl = ({ id, icon }) => {
    let backgroundImageUrl;

    // Confronto con l'ID del tempo per selezionare l'immagine di sfondo appropriata
    if (id >= 200 && id <= 232) {
      backgroundImageUrl = thunderstorm200;
    } else if (id >= 300 && id <= 321) {
      backgroundImageUrl = drizzle300;
    } else if (id >= 500 && id <= 531) {
      backgroundImageUrl = rain500;
    } else if (id >= 600 && id <= 622) {
      backgroundImageUrl = snow600;
    } else if (id >= 701 && id <= 781) {
      backgroundImageUrl = fog700;
    } else if (id === 800) {
      if (icon === "01d") {
        backgroundImageUrl = clear800d;
      } else {
        backgroundImageUrl = clear800n;
      }
    } else if (id >= 801 && id <= 804) {
      backgroundImageUrl = cloud801;
    }

    return backgroundImageUrl;
  };
  useEffect(() => {
    const fetchLocality = async () => {
      try {
        const token = "4c67e6677a48d9f7e61fcbff458ccff4";
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${token}`);
        if (!response.ok) {
          setHasData(false);
          throw new Error("Impossibile trovare la città, riprovare");
        }

        const data = await response.json();
        setCityData(data);

        const secondResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${token}&units=metric`
        );

        if (!secondResponse.ok) {
          throw new Error("Errore nella seconda chiamata API");
        }

        const secondData = await secondResponse.json();
        setAdditionalData(secondData);
        const newBackgroundImageUrl = getBackgroundImageUrl(secondData.weather[0]);
        setBackgroundImageUrl(newBackgroundImageUrl);
      } catch (error) {
        console.error("Errore durante la richiesta API:", error);
        setHasData(false);
      }
    };

    fetchLocality();
  }, [cityName]);

  if (!hasData) {
    return <Navigate to="/not-found" />;
  }
  if (!cityData || !additionalData) {
    return <h2 className="text-white">Caricamento...</h2>;
  }

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Card
          className="bg-dark text-white opacity-35 background-image"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
          }}
          onClick={() => navigate(`/forecast/${cityData[0].lat}/${cityData[0].lon}/${cityData[0].name}`)}
        >
          <Card.ImgOverlay>
            <Card.Title className="text-start blur-text">
              <h2>{cityData[0].name}</h2>
            </Card.Title>
            <Card.Text className="fs-3 text-start blur-text">
              <TbTemperature size={40} /> {parseInt(additionalData.main?.temp)}
              <TbTemperatureCelsius size={30} />
            </Card.Text>
            <Card.Text className="fs-3 text-start blur-text">
              <LuWind size={40} /> {additionalData.wind?.speed} <span>km/h</span>
            </Card.Text>
            <Card.Img
              src={`https://openweathermap.org/img/wn/${additionalData.weather[0].icon}@2x.png`}
              alt="icon"
              className="card-image"
            />
          </Card.ImgOverlay>
        </Card>
        {/* <Card
          style={{
            backgroundImage: `url(${`https://openweathermap.org/img/wn/${additionalData.weather[0].icon}@2x.png`})`,
          }}
        >
          {" "}
          <h2>Dettagli della città: {additionalData.name}</h2>
          <h2>Temperatura minima: {additionalData.main.temp_min}</h2>
          <h2>Umidità: {additionalData.main.humidity}</h2>
          <img src={`https://openweathermap.org/img/wn/${additionalData.weather[0].icon}@2x.png`} alt="icon" />
        </Card> */}
      </Row>
    </div>
  );
}

export default Details;
