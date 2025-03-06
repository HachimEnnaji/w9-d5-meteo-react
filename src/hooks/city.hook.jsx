import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function UseCity() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`Details/${city}`);
  };
  const onChange = (e) => setCity(e.target.value);

  const inputProps = {
    value: city,
    onChange,
  };

  return {
    inputProps,
    handleSubmit,
  };
}
