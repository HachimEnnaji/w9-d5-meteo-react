// Main.jsx
import { Button, Container, Form } from "react-bootstrap";
import UseCity from "../hooks/city.hook";

function Main() {
  const { handleSubmit, inputProps } = UseCity("");
  return (
    <>
      <Container className="text-blur">
        <Form onSubmit={handleSubmit}>
          <input className="w-75 rounded shadow ps-3" placeholder="Search City" {...inputProps} type="text" />
          <Button variant="secondary" type="submit">
            Search
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Main;
