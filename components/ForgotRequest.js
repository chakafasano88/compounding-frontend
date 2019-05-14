import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import { Container, Row, Col, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Loader from './Loader';
import CompCard from '../components/common/card/Card';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class ForgotRequest extends Component {
  state = {
    email: '',
    formProcessing: false
  };

  _saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { formProcessing, email } = this.state;

    return (
      <div>
        <Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
          {(requestReset, { error, loading, called }) => (
            <Form method="post"
              onSubmit={async e => {
                e.preventDefault();

                this.setState({ formProcessing: true })
                const res = await requestReset();
                this.setState({ email: '' })
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
                        {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
                        <FormGroup>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="Enter email..."
                            onChange={this._saveToState}
                          >
                          </Input>
                        </FormGroup>
                        <div className="text-center">
                          <Button color="primary" className="full-width">Send Password Reset Email</Button>
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

export default ForgotRequest;
export { REQUEST_RESET_MUTATION };
