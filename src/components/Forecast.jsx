import React, { useEffect, useState } from "react";
import { Button, Carousel, Collapse, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { MdCalendarToday } from "react-icons/md";
import { TbClockHour9 } from "react-icons/tb";
import { TbTemperature } from "react-icons/tb";
import { RiCelsiusFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";

function Forecast({ place }) {
  const { lat, lon, city } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const [open, setOpen] = useState(false);
  const [continent, setContinent] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageBackground, setImageBackground] = useState("");
  const [urlAnime, setUrlAnime] = useState("");

  //   const thunderstorm200 = "https://i.ytimg.com/vi/wF6DoQn6pxU/maxresdefault.jpg";
  //   const drizzle300 =
  //     "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/rain/raindrops-misted-on-a-windscreen.jpg";
  //   const rain500 = "https://i.ytimg.com/vi/P-7Lwh93vDI/maxresdefault.jpg";
  //   const snow600 = "https://i.ytimg.com/vi/MYnElTvpMPY/maxresdefault.jpg";
  //   const fog700 = "https://c4.wallpaperflare.com/wallpaper/370/629/227/anime-original-fog-girl-hd-wallpaper-thumb.jpg";
  //   const clear800d = "https://wallpapercave.com/wp/wp8383953.jpg";
  //   const clear800n = "https://as1.ftcdn.net/v2/jpg/05/51/75/12/1000_F_551751216_AQtvKSsd37KBYdLwJ9lPWGqId4zfMBnZ.jpg";
  //   const cloud801 = "https://c4.wallpaperflare.com/wallpaper/842/18/565/anime-sky-cloud-clouds-wallpaper-preview.jpg";

  const timeConverter = (data) => {
    let a = new Date(data * 1000);
    const date = a.getDate();
    let hour = a.getHours();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[a.getMonth()];
    if (hour + 2 === 24) hour = 0;
    if (hour < 9) hour = "0" + hour;
    return [date, hour, `${date} ${month}`];
  };

  //   const getBackgroundImageUrlAnime = ({ id, icon }) => {
  //     let backgroundImageUrl;

  //     // Confronto con l'ID del tempo per selezionare l'immagine di sfondo appropriata
  //     if (id >= 200 && id <= 232) {
  //       backgroundImageUrl = thunderstorm200;
  //     } else if (id >= 300 && id <= 321) {
  //       backgroundImageUrl = drizzle300;
  //     } else if (id >= 500 && id <= 531) {
  //       backgroundImageUrl = rain500;
  //     } else if (id >= 600 && id <= 622) {
  //       backgroundImageUrl = snow600;
  //     } else if (id >= 701 && id <= 781) {
  //       backgroundImageUrl = fog700;
  //     } else if (id === 800) {
  //       if (icon === "01d") {
  //         backgroundImageUrl = clear800d;
  //       } else {
  //         backgroundImageUrl = clear800n;
  //       }
  //     } else if (id >= 801 && id <= 804) {
  //       backgroundImageUrl = cloud801;
  //     }
  //     setUrlAnime(backgroundImageUrl);
  //   };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "4c67e6677a48d9f7e61fcbff458ccff4";

        // Fetch forecast data
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${token}&units=metric`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Errore nella richiesta API");
        }
        console.log(response);

        const data = await response.json();
        setForecastData(data);
        // SERVER IN DOWN HANNO CHIUSO L'ENDPOINT

        // Fetch city background data
        // const cityResponse = await fetch(`https://api.teleport.org/api/cities/?search=${city}`);
        // if (!cityResponse.ok) {
        //   throw new Error("Errore nella richiesta API città background: city");
        // }
        // const citySearch = await cityResponse.json();
        // if (citySearch.count === 0) {
        //   setLoading(false);
        //   setImageBackground("https://live.staticflickr.com/65535/50266501741_6781d3d936_b.jpg");
        //   throw new Error("la città non è presente nell'api");
        // }
        // const cityId = citySearch._embedded["city:search-results"][0]._links["city:item"].href;

        // const secondResponse = await fetch(cityId);
        // if (!secondResponse.ok) {
        //   throw new Error("Errore nella richiesta API città background: geoNameId");
        // }

        // const geoNameId = await secondResponse.json();
        // // setFullNameCity(geoNameId.full_name);

        // const slug = geoNameId._links["city:urban_area"].href;
        // const thirdResponse = await fetch(slug);
        // if (!thirdResponse.ok) {
        //   throw new Error("Errore nella richiesta API città background: slug");
        // }

        // const dataImage = await thirdResponse.json();
        // setContinent(dataImage.continent);
        // console.log(dataImage._links["ua:images"].href);
        // const lastResponse = await fetch(dataImage._links["ua:images"].href);
        // if (!lastResponse.ok) {
        //   throw new Error("Errore nella richiesta API città background: immagine");
        // }
        // const lastDataImage = await lastResponse.json();
        // setImageBackground(lastDataImage.photos[0].image.mobile);
        setImageBackground("https://live.staticflickr.com/65535/50266501741_6781d3d936_b.jpg");
        setLoading(false);
      } catch (error) {
        console.error("Errore durante la richiesta API:", error);
      }
    };

    fetchData();
  }, [lat, lon, city]);

  if (loading) {
    return <Spinner animation="grow" variant="success" />;
  }

  return (
    <Container className="background-city">
      <div className="forecast-format text-white ">
        <h2>{` ${place.name}  ${place.state ? "• " + place.state : ""} `}</h2>
        {continent ? <h3>{continent}</h3> : <></>}
      </div>
      <Carousel>
        {forecastData.list.map((dayForecast, index) => (
          // getBackgroundImageUrlAnime(dayForecast.weather[0]);
          <Carousel.Item key={`dayForecast${index}`} className="my-3">
            <img src={imageBackground} alt="city" className="rounded-2 img-forecast" />
            <Carousel.Caption>
              <div className="forecast-format">
                <h3>
                  <MdCalendarToday /> {timeConverter(dayForecast.dt)[2]} <TbClockHour9 />{" "}
                  {timeConverter(dayForecast.dt)[1]} : 00
                </h3>
                <img src={`https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`} alt="" />
                <h4>
                  <TbTemperature /> {Math.round(dayForecast.main.temp)} <RiCelsiusFill />
                </h4>
                <h4>
                  <WiHumidity /> {dayForecast.main.humidity} % - <GiWindsock /> {dayForecast.wind.speed} Km/h
                </h4>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Forecast;
