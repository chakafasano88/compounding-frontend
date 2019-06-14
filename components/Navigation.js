import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';
import Router from 'next/router';
import '../index.scss';
import FocusWrapper from '../components/common/focus-wrapper/FocusWrapper';

class Navigation extends React.Component {

  componentDidMount() {
    this.navigationWrapper.focus();
  }

  render() {

    return (
      <FocusWrapper navPrefix={false} refName={(c) => { this.navigationWrapper = c; }} >
        <Container className="navigation">
          <Row>
            <Col sm={12} md={6} className="link-container">
              <Link href="/business">
                <a id="business" className="grow"><span className="navigation__letter">B</span>usiness</a>
              </Link>
            </Col>
            <Col sm={12} md={6} className="link-container text-right">
              <Link href="/thinking">
                <a id="thinking" className="grow"><span className="navigation__letter">T</span>hinking</a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="d-flex justify-content-center">
              <Link href="/about">
                <a style={{ fontSize: '55px' }} id="compounding" className="grow"><span className="navigation__letter lg">F</span>ocusLoop</a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} className="link-container">
              <Link href="/science">
                <a id="science" className="grow"><span className="navigation__letter">S</span>cience</a>
              </Link>
            </Col>
            <Col sm={12} md={6} className="link-container text-right">
              <Link href="/investing" >
                <a id="investing" className="grow"><span className="navigation__letter skinny"> I</span>nvesting</a>
              </Link>
            </Col>
          </Row>
        </Container>
      </FocusWrapper>
    );
  }
}

export default Navigation;