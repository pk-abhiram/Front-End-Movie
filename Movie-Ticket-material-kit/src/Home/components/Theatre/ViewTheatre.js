import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTheatre } from '../Actions/actions';
import { CustomLocaleTextGrid } from './PrintTheatres';
import { Container, Row, Col } from 'react-bootstrap';

function ViewTheatre() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTheatre());
  }, [dispatch]);

  const theatres = useSelector((state) => state.theatres);

  return (
    <Container>
      <Row style={{ textAlign: 'center' }}>
        <Col>
          <h1>THEATRE</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <div>{theatres && CustomLocaleTextGrid()}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewTheatre;
