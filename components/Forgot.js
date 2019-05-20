import React, { Component } from 'react';
import { Container, Row, Col, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { CURRENT_USER_QUERY } from './User';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Loader from './Loader';
import CompCard from '../components/common/card/Card';
import CompButton from '../components/common/button/Button';

const FORGOT_PASSWORD_MUTATION = gql`
   mutation FORGOT_PASSWORD_MUTATION($password: String! $confirmPassword: String! $resetToken: String!) {
       resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken) {
            id
       }
   }
   
`;

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            resetToken: ''
        }
    }

    componentDidMount() {
        this.setState({ resetToken: this.props.resetToken })
    }

    _saveToState = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            formProcessing: false
        });
    }

    render() {
        const { formProcessing, password, confirmPassword } = this.state;
        return (
            <div>
                <div>
                    <Mutation mutation={FORGOT_PASSWORD_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                        {(resetPassword, { error, loading, data }) => (
                            <Form method="post"
                                onSubmit={async e => {
                                    e.preventDefault();

                                    this.setState({ formProcessing: true })
                                    const res = await resetPassword();
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
                                                    <p>Enter your new password.</p>

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
                                                            type="password"
                                                            name="confirmPassword"
                                                            value={confirmPassword}
                                                            onChange={this._saveToState}
                                                            placeholder="Confirm password...">
                                                        </Input>
                                                    </FormGroup>
                                                    <div className="text-center">
                                                        <CompButton loading={loading} icon="cog" color="primary" className="full-width">Reset Password</CompButton>
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