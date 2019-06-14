import React, { Component } from 'react';
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row, ListGroup, Input, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card';
import CompButton from '../components/common/button/Button';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { CURRENT_USER_QUERY } from './User';


const UPDATE_USER_MUTATION = gql`
    mutation UPDATE_USER_MUTATION(
        $email: String
        $password: String
        $confirmPassword: String
        $firstName: String
        $lastName: String
        $profileImage: String
        $company: String
        $occupation: String
    ) {
        updateUser(
            email: $email, 
            firstName: $firstName, 
            lastName: $lastName, 
            password: $password, 
            confirmPassword: $confirmPassword,
            profileImage: $profileImage
            company: $company
            occupation: $occupation)
            { 
            id
        }
    }
`;

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            company: '',
            occupation: '',
            profileImage: '',
            largeImage: '',
            password: '',
            confirmPassword: '',
            formSubmitted: false,
            formProcessing: false,
            fileIsLoading: false
        }

    }

    componentDidMount() {
        if (this.props.currentUser) {
            const { email, firstName, lastName, profileImage, occupation, company } = this.props.currentUser;
            this.setState({ email, firstName, lastName, profileImage, company, occupation })
        }
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value, formProcessing: false });
    }


    _uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "focus-loop");

        this.setState({ fileIsLoading: true })

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dneau72id/image/upload",
            {
                method: "POST",
                body: data
            }
        );


        const file = await res.json();

        this.setState({
            profileImage: file.secure_url,
            largeImage: file.eager[0].secure_url,
            fileIsLoading: false
        });
    };

    _renderCroppedImage = () => {
        const { profileImage } = this.state;
        let updatedImage = profileImage.slice();
        updatedImage = `${updatedImage.split('upload/v')[0]}upload/w_380,h_380,c_crop,g_face,r_max/w_200/compounding${updatedImage.split('compounding')[1]}`
        return updatedImage;
    }

    render() {
        const { firstName, lastName, company, occupation, confirmPassword, password, email, formProcessing, profileImage, fileIsLoading } = this.state;
        return (
            <div>

                <Row className="no-gutter">
                    <Col sm={6}>
                        <Mutation
                            mutation={UPDATE_USER_MUTATION}
                            variables={{ firstName, lastName, email, profileImage, occupation, company }}
                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        >
                            {(updateProfile, { loading, data, error, called }) => (
                                <Form method="post" name="userInfoForm" onSubmit={async e => {
                                    e.preventDefault();
                                    const res = updateProfile();
                                    toast.success('Profile updated!');
                                }}>
                                    {loading || fileIsLoading && <Loader />}
                                    {<Error error={error} />}
                                    <CompCard>
                                        <CardHeader>General Info</CardHeader>
                                        <CardBody>
                                            {profileImage && (
                                                <Row>
                                                    <Col sm={4}>
                                                        <div className="profile__list-group" >
                                                            <ul style={{ listStyle: 'none' }} >
                                                                <li>Name: {firstName + ' ' + lastName}</li>
                                                                <li>Company: {company}</li>
                                                                <li>Occupation: {occupation}</li>
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <div className="profile__img--wrapper">
                                                            <img src={this._renderCroppedImage()}
                                                                alt="" />
                                                            <p style={{ fontSize: '30px' }} >{`${firstName} ${lastName}`}</p>
                                                        </div>
                                                    </Col>
                                                    <Col sm={4}>
                                                    </Col>
                                                </Row>
                                            )}
                                            <FormGroup>
                                                <Label>Profile Image</Label>
                                                <Input
                                                    type="file"
                                                    name="profileImage"
                                                    autoComplete="off"
                                                    placeholder="Upload an Image..."
                                                    onChange={this._uploadFile}
                                                >
                                                </Input>
                                            </FormGroup>

                                            <Row>
                                                <Col sm={6}>
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
                                                </Col>
                                                <Col sm={6}>
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
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <Label>Company</Label>
                                                        <Input
                                                            type="text"
                                                            name="company"
                                                            value={company}
                                                            placeholder="Enter first company name..."
                                                            onChange={this._saveToState}
                                                        >
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={6}>
                                                    <FormGroup>
                                                        <Label>Occupation</Label>
                                                        <Input
                                                            type="text"
                                                            name="occupation"
                                                            value={occupation}
                                                            placeholder="Enter occupation name..."
                                                            onChange={this._saveToState}
                                                        >
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

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
                                            <div className="text-right">
                                                <CompButton color="primary" icon="cog" loading={loading} type="submit" >Submit</CompButton>
                                            </div>
                                        </CardBody>
                                    </CompCard>
                                </Form>
                            )}
                        </Mutation>
                    </Col>
                    <Col sm={6}>
                        <Mutation mutation={UPDATE_USER_MUTATION} variables={{ password, confirmPassword }}
                        >
                            {(updateProfile, { loading, data, error, called }) => (
                                <Form method="post" onSubmit={async e => {
                                    e.preventDefault();
                                    this.setState({ confirmPassword: '' })
                                    const res = updateProfile();
                                }}>

                                    <CompCard>
                                        <CardHeader>Reset Password</CardHeader>
                                        <CardBody>
                                            <FormGroup>
                                                <Label>Password</Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={this._saveToState}
                                                    required
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
                                                    required
                                                    placeholder="Confirm password...">
                                                </Input>
                                            </FormGroup>
                                            <div className="text-right">
                                                <CompButton color="primary" icon="cog" loading={loading} type="submit" >Submit</CompButton>
                                            </div>
                                        </CardBody>
                                    </CompCard>
                                </Form>
                            )}
                        </Mutation>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;