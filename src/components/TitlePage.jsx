import React from "react";
import { Navbar } from "react-bootstrap";

function TitlePage() {
  return (
    <Navbar bg="light" className="mb-5 navbar">
      <Navbar.Brand href="#">
        <h2 className="text-white">Meteo Weather</h2>
      </Navbar.Brand>
    </Navbar>
  );
}

export default TitlePage;
