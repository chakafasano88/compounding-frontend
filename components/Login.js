import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage'
import Loader from './Loader';
import CompCard from '../components/common/card/Card';


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
            login: {
                email: '',
                password: ''
            },
            formProcessing: false
  
        }
    }

    _saveToState = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value, 
            formProcessing: false 
        });
    }


    render() {
        const { name, formProcessing, login } = this.state;
        return (
            <div>
                <Mutation mutation={LOGIN_MUTATION} variables={login} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                    {(login, { error, loading, data }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();
                            
                            this.setState({ formProcessing: true })           
                            const res = await login();
                            this.setState({ login: { email: "", password: ""} })
                            
                            Router.push('/');
                        }} >
                           
                            <Container>
                              {formProcessing && error && <Error error={error} />}
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
                                                        value={login.email}
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
                                                        value={login.password}
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