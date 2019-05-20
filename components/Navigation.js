import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';
import Router from 'next/router';
import '../index.scss';
import KeyPress from './KeyPress';

class Navigation extends React.Component {

  render() {
    return (
      <div >
        <Container className="navigation">
          <Row>
            <Col sm={6} className="link-container">
              <Link href="/business">
                <a className="grow">Business</a>
              </Link>
            </Col>
            <Col sm={6} className="link-container text-right">
              <Link href="/thinking">
                <a className="grow">Thinking</a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="d-flex justify-content-center">
              <Link href="/about">
                <a className="grow"><h1>Compounding</h1></a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="link-container">
              <Link href="/science">
                <a className="grow">Science</a>
              </Link>
            </Col>
            <Col sm={6} className="link-container text-right">
              <Link href="/investing" >
                <a className="grow">Investing</a>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Navigation;