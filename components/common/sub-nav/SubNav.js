import React from "react";
import { Card, Row, Col } from "reactstrap";
import Link from 'next/link';
import Router from 'next/router';
import KeyPressLink from '../links/KeyPressLink';

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
                    <KeyPressLink href="/thinking" id="sub-thinking" text="T"></KeyPressLink>
                    {/* <Link href="/thinking">
                        <a id="sub-thinking" className="grow"><span className={`navigation__letter sm ${currentRoute === '/thinking' ? 'highlight' : ''}`}>T</span></a>
                    </Link> */}
                    <Link href="/business">
                        <a id="sub-business" className="grow"><span className={`navigation__letter sm ${currentRoute === '/business' ? 'highlight' : ''}`}>B</span></a>
                    </Link>
                    <Link href="/science">
                        <a id="sub-science" className="grow"><span className={`navigation__letter sm ${currentRoute === '/science' ? 'highlight' : ''}`}>S</span></a>
                    </Link>
                    <Link href="/investing">
                        <a id="sub-investing" className="grow"><span className={`navigation__letter sm ${currentRoute === '/investing' ? 'highlight' : ''}`}>I</span></a>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default SubNav;
