import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const Index = () => {
  const [key, setKey] = useState();
  useEffect(() => {
    sessionStorage.removeItem('ApiKey');
  }, []);

  return (
    <Container fluid className="m-auto">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>APIKEY</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter APIKEY"
            value={key}
            onChange={e => setKey(e.target.value)}
          />
          <Form.Text className="text-muted">Enter your Linear ApiKey</Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!key}
          onClick={e => setKey(e.target.value)}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Index;
