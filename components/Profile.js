import React, { Component } from 'react';
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, Label, Row, ListGroup, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card';

class Profile extends Component {
    render() {
        return (
            <div>
                <Row className="no-gutter">
                    <Col sm={6}>
                        <CompCard>
                            <CardHeader>Profile</CardHeader>
                            <CardBody>

                            </CardBody>
                        </CompCard>
                    </Col>
                    <Col sm={6}>
                        <CompCard>
                            <CardHeader>Profile</CardHeader>
                            <CardBody>

                            </CardBody>
                        </CompCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;