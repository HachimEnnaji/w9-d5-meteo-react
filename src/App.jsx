import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import TitlePage from "./components/TitlePage";
import NotFound from "./components/NotFound";
import Forecast from "./components/Forecast";
function App() {
  return (
    <div className="App text-center">
      <BrowserRouter>
        <TitlePage />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Details/:city" element={<Details />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forecast/:lat/:lon" element={<Forecast />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
