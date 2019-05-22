import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';
import Router from 'next/router';
import '../index.scss';
import KeyPress from './KeyPress';

class Navigation extends React.Component {

  componentDidMount() {
    this.div.focus();
  }

  _handleKeyDown = (event) => {
    const key = event.keyCode;

    switch (key) {
      case 84:
        let tag1 = document.getElementById('thinking');
        tag1.className = "hover";
        this._timeout('/thinking');
        return;
      case 73:
        let tag2 = document.getElementById('investing');
        tag2.className = "hover";
        this._timeout('/investing');
        return;
      case 66:
        let tag3 = document.getElementById('business');
        tag3.className = "hover";
        this._timeout('/business');
        return;
      case 83:
        let tag4 = document.getElementById('science');
        tag4.className = "hover";
        this._timeout('/science');
        return;
      case 67:
        let tag5 = document.getElementById('compounding');
        tag5.className = "hover";
        this._timeout('/about');
        return;
    }
  }

  _timeout = (route) => {
    setTimeout(() => {
      Router.push(route)
    }, 1000);
  }


  render() {

    // ref={(c) => {this.div = c;}}
    return (
      <div className="focusDiv" tabIndex="1" onKeyDown={this._handleKeyDown} ref={(c) => {this.div = c;}}>
        {/* <div onKeyDown={this._handleKeyDown} ref={(c) => {this.div = c;}}>  */}
        <Container className="navigation">
          <Row>
            <Col sm={6} className="link-container">

              <Link href="/business">
                <a id="business" className="grow"><span className="navigation__letter">B</span>usiness</a>
              </Link>
            </Col>
            <Col sm={6} className="link-container text-right">
              <Link href="/thinking">
                <a id="thinking" className="grow"><span className="navigation__letter">T</span>hinking</a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="d-flex justify-content-center">
              <Link href="/about">
                <a style={{ fontSize: '40px' }} id="compounding" className="grow"><span className="navigation__letter">C</span>ompounding</a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={6} className="link-container">
              <Link href="/science">
                <a id="science" className="grow"><span className="navigation__letter">S</span>cience</a>
              </Link>
            </Col>
            <Col sm={6} className="link-container text-right">
              <Link href="/investing" >
                <a id="investing" className="grow"><span className="navigation__letter skinny"> I</span>nvesting</a>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Navigation;