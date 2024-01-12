import React, { useEffect } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 90000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row className="d-flex justify-content-center">
      <Col xs={9}>
        <Alert variant="danger" className="opacity-75">
          <h2 className="h1">404 - Not Found</h2>
          <h2 className="display-3">The page you are looking for does not exist.</h2>
          <h3 className="display-3 ">Please click the button below if you are not redirected within a few seconds</h3>
        </Alert>
        <Button variant="light" className="opacity-100" onClick={() => navigate("/")}>
          Go back to Home
        </Button>
      </Col>
    </Row>
  );
}

export default NotFound;
