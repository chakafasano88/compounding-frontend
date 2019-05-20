import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage'
import Loader from './Loader';
import CompCard from '../components/common/card/Card';
import CompButton from '../components/common/button/Button';

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    _saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            formProcessing: false 
        });
    }

    render() {
        const { formProcessing } = this.state;
        return (
            <div>
                <div>
                    <Mutation mutation={LOGIN_MUTATION} variables={this.state.email} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                        {(login, { error, loading, data }) => (
                            <Form method="post"
                                onSubmit={async e => {
                                    e.preventDefault();

                                    this.setState({ formProcessing: true })
                                    const res = await login();
                                    this.setState({ email: null })

                                    Router.push('/');
                                }}
                            >

                                <Container>
                                    {formProcessing && error && <Error error={error} />}
                                    <Row>
                                        <Col sm={3}></Col>
                                        <Col sm={6}>
                                            <CompCard>
                                                <CardHeader>Reset your password</CardHeader>
                                                <CardBody>
                                                    <p>Enter your email address and we will send you a link to reset your password.</p>

                                                    <FormGroup style={{ textAlign: 'center' }}>

                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Email</Label>
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            value={this.state.email}
                                                            placeholder="Enter email..."
                                              s              onChange={this._saveToState}
                                                        >
                                                        </Input>
                                                    </FormGroup>
                                                    <div className="text-center">
                                                        <CompButton loading={loading} icon="cog" color="primary" className="full-width">Login</CompButton>
                                                    </div>
                                                </CardBody>
                                            </CompCard>
                                        </Col>
                                        <Col sm={3}></Col>
                                    </Row>
                                </Container>
                            </Form>
                        )}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default Forgot;