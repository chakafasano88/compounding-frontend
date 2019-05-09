import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CompCard from '../components/common/card/Card';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION(
        $email: String! 
        $password: String!
    ) {
        login(email: $email, password: $password) {
            token 
            user {
                id
                email
                name
            }
        }
    }
`;

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { name, password, email } = this.state;
        return (
            <div>
                <Mutation mutation={LOGIN_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                    {(login, { error, loading }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();
                            const res = await login();
                            this.setState({ name: "", email: "", password: "" })
                            
                            Router.push('/');
                        }} >
                            <Container>
                                <Row>
                                    <Col sm={3}></Col>
                                    <Col sm={6}>
                                        <CompCard>
                                            <CardHeader>Login</CardHeader>
                                            <CardBody>
                                                <FormGroup>
                                                    <Label>Email</Label>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        value={email}
                                                        placeholder="Enter email..."
                                                        onChange={this._saveToState}
                                                    >
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Password</Label>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={this._saveToState}
                                                        placeholder="Enter password...">
                                                    </Input>
                                                </FormGroup>
                                                <div className="text-center">
                                                    <Button color="primary" className="full-width">Login</Button>
                                                    <div className="mt-2">
                                                        <Link href="/forgot">
                                                            <a>Forgot Password ?</a>
                                                        </Link>
                                                    </div>
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
        );
    }
}

export default Login;