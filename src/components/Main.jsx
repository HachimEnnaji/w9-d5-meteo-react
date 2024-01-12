// Main.jsx
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Main() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Città cercata:", city);
    navigate(`Details/${city}`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          className="w-75 rounded shadow ps-3"
          placeholder="Search City"
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Button variant="secondary" type="submit">
          Search
        </Button>
      </Form>
    </>
  );
}

export default Main;
