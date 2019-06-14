import React from "react";
import { Card, Row, Col } from "reactstrap";
import Link from 'next/link';
import Router from 'next/router';

const SubNav = props => {
    let { className } = props;
    if ("undefined" === typeof className) {
        className = "";
    }

    let currentRoute = null;
   
   
    return (
        <div>
            <Row className={`sub-nav ${className}`}>
                <Col sm={12}>
                    <Link href="/thinking">
                        <a id="thinking" className="grow"><span className={`navigation__letter sm ${currentRoute === '/thinking' ? 'highlight' : ''}`}>T</span></a>
                    </Link>
                    <Link href="/business">
                        <a id="business" className="grow"><span className={`navigation__letter sm ${currentRoute === '/business' ? 'highlight' : ''}`}>B</span></a>
                    </Link>
                    <Link href="/science">
                        <a id="science" className="grow"><span className={`navigation__letter sm ${currentRoute === '/science' ? 'highlight' : ''}`}>S</span></a>
                    </Link>
                    <Link href="/investing">
                        <a id="investing" className="grow"><span className={`navigation__letter sm ${currentRoute === '/investing' ? 'highlight' : ''}`}>I</span></a>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default SubNav;
