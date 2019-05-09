import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';
import '../index.scss';

class Navigation extends React.Component {
  render() {
    return (
      <div >
        <Container className="navigation">
          <Row>
            <Col sm={12} className="link-container">
                <Link href="/business">
                  <a>Business</a>
                </Link>
                <Link href="/thinking">
                  <a>Thinking</a>
                </Link>
            </Col>
            <Col sm={12} className="d-flex justify-content-center">
                <Link href="/about">
                  <a><h1>Compounding</h1></a>
                </Link>
            </Col>
            <Col sm={12} className="link-container">
              <Link href="/science">
                <a>Science</a>
              </Link>
              <Link href="/investing">
                <a>Investing</a>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Navigation;