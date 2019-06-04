import React, { Component } from 'react';
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, ListGroup, Input, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const UPDATE_USER_MUTATION = gql`
    mutation UPDATE_USER_MUTATION(
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

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            formSubmitted: false,
            formProcessing: false,
            profileImage: ''
        }

    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value, formProcessing: false });
    }


    _uploadFile = async e => {
        console.log("uploading file...");
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "sickfits");
    
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dneau72id/image/upload",
          {
            method: "POST",
            body: data
          }
        );
    
        const file = await res.json();
        console.log("FILE", file)
        this.setState({
          profileImage: file.secure_url
        });
      };

    render() {
        const { firstName, lastName, confirmPassword, password, email, formProcessing , profileImage} = this.state;
        return (
            <div>
                <Row className="no-gutter">
                    <Col sm={6}>
                        <CompCard>
                            <CardHeader>Profile</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label>Image</Label>
                                    <Input
                                        type="file"
                                        name="profileImage"
                                        value={profileImage}
                                        autoComplete="off"
                                        placeholder="Upload an Image..."
                                        onChange={this._uploadFile}
                                    >
                                    </Input>
                                </FormGroup>

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
                            </CardBody>
                        </CompCard>
                    </Col>
                    <Col sm={6}>
                        <CompCard>
                            <CardHeader>Profile</CardHeader>
                            <CardBody>
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
                            </CardBody>
                        </CompCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;