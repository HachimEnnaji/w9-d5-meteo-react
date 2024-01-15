import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import TitlePage from "./components/TitlePage";
import NotFound from "./components/NotFound";
import Forecast from "./components/Forecast";
import { useEffect, useState } from "react";
function App() {
  const [place, setPlace] = useState({
    name: "",
    state: "",
  });
  const handleCity = (city) => {
    setPlace({ name: city.name, state: city.state });
  };

  return (
    <div className="App text-center">
      <BrowserRouter>
        <TitlePage />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Details/:city" element={<Details handleCity={handleCity} />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/forecast/:lat/:lon/:city" element={<Forecast place={place} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
