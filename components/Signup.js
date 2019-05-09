import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CompCard from '../components/common/card/Card';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION(
        $email: String! 
        $password: String!
        $name: String!
    ) {
        signup(email: $email, name: $name, password: $password) {
            token 
            user {
                id
                email
                name
            }
        }
    }
`;

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { name, password, email } = this.state;
        return (
            <div>
                <Mutation mutation={SIGN_UP_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]} >
                    {(signup, { error, loading }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();
                            await signup();
                            Router.push('/');
                            this.setState({ name: "", email: "", password: "" })
                        }} >
                            <Container>
                                <Row>
                                    <Col sm={3}></Col>
                                    <Col sm={6}>
                                        <CompCard>
                                            <CardHeader>Signup</CardHeader>
                                            <CardBody>

                                                <FormGroup>
                                                    <Label>Name</Label>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        value={name}
                                                        placeholder="Enter name..."
                                                        onChange={this._saveToState}
                                                    >
                                                    </Input>
                                                </FormGroup>
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
                                                    <Button color="primary" className="full-width">Sign Up</Button>
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

export default Signup;