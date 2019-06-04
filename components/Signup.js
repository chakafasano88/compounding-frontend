import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CompCard from '../components/common/card/Card';
import CompButton from '../components/common/button/Button';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION(
        $email: String! 
        $password: String!
        $confirmPassword: String!
        $firstName: String!
        $lastName: String!
    ) {
        signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password, confirmPassword: $confirmPassword) {
            token 
            user {
                id
                email
                
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
            firstName: '',
            lastName: '',
            confirmPassword: '',
            formSubmitted: false,
            formProcessing: false
        }
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value, formProcessing: false });
    }

    render() {
        const { firstName, lastName, confirmPassword, password, email, formProcessing } = this.state;
        return (
            <div>
                <Mutation mutation={SIGN_UP_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]} >
                    {(signup, { error, loading }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();
                            this.setState({ formSubmitted: true, formProcessing: true })

                            await signup();

                            this.setState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
                            Router.push('/');
                        }} >
                            {formProcessing && error && <Error error={error} />}
                            <Container>
                                <Row>
                                    <Col sm={3}></Col>
                                    <Col sm={6}>
                                        <CompCard>
                                            <CardHeader>Signup</CardHeader>
                                            <CardBody>
                                                <FormGroup>
                                                    <Label>First Name</Label>
                                                    <Input
                                                        type="text"
                                                        name="firstName"
                                                        value={firstName}
                                                        placeholder="Enter first name..."
                                                        onChange={this._saveToState}
                                                    >
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>Last Name</Label>
                                                    <Input
                                                        type="text"
                                                        name="lastName"
                                                        value={lastName}
                                                        placeholder="Enter last name..."
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
                                                <FormGroup>
                                                    <Label>Confirm Password</Label>
                                                    <Input
                                                        invalid={this._isInvalid}
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={confirmPassword}
                                                        onChange={this._saveToState}
                                                        placeholder="Confirm password...">
                                                    </Input>
                                                </FormGroup>
                                                <div className="text-center">
                                                <CompButton loading={loading} color="primary" icon="cog" className="full-width">Signup</CompButton>
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