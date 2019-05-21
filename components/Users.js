import React, { Component } from 'react';
import { Table, CardHeader, CardBody, Button, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import CompCard from './common/card/Card';
import CompButton from './common/button/Button';
import CompModal from './common/modal/Modal';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import generateUuid from '../lib/uuidGen';

const CREATE_USER_MUTATION = gql`
    mutation CREATE_USER_MUTATION(
        $email: String! 
        $firstName: String!
        $lastName: String!
        $permissions: String! 
        $password: String!
    ) {
        createUser(email: $email, firstName: $firstName, lastName: $lastName, password: $password, permissions: $permissions) {
            id
            email
        }
    }
`;

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            firstName
            lastName
            email
            status
            permissions
        }
    }
`

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            email: '',
            firstName: '',
            lastName: '',
            password: generateUuid(),
            permissions: 'USER',
            permissionTypes: [{
                id: 'USER',
                name: 'User'
            }, {
                id: 'ADMIN',
                name: 'Admin'
            }]
        }
    }


    _toggleUserModal = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen })
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value, formProcessing: false });
    }

    render() {
        const { firstName, lastName, permissions, password, email, permissionTypes } = this.state;
        return (
            <div>
                <CompCard>
                    <CardHeader className="d-flex justify-content-between align-items-center">Users
                        <Button type="button" size="sm" onClick={this._toggleUserModal} color="primary"><FontAwesomeIcon icon="plus" color="white" ></FontAwesomeIcon> Add User</Button>
                    </CardHeader>
                    <CardBody>
                        <Query query={ALL_USERS_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error: {error.message}</p>;
                                const { users } = data;
                                console.log("USER", users)
                                return (
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Level</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, i) => (
                                                <tr key={i} >
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.permissions[0]}</td>
                                                    <td>{user.status === 1 ? 'Active' : 'Inactive'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                );
                            }}
                        </Query>
                    </CardBody>
                </CompCard>
                <CompModal isOpen={this.state.isOpen} toggle={this._toggleUserModal}>
                    <ModalHeader>Create a User</ModalHeader>
                    <Mutation
                        mutation={CREATE_USER_MUTATION}
                        variables={{ firstName, lastName, email, permissions, password }}
                    >
                        {(createUser, { error, loading, called }) => (
                            <Form method="post" onSubmit={async e => {
                                e.preventDefault();
                                this.setState({ password: generateUuid() })

                                const res = await createUser();
                                console.log("Success!", res)

                            }}>
                                <ModalBody>
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
                                        <Label>User Type</Label>
                                        <select className="form-control" name="permissions" onChange={this._saveToState}>
                                            {permissionTypes.map((type, i) => (
                                                <option key={i} value={type.id}>{type.name}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <ModalFooter>
                                        <CompButton onClick={e => this.setState({ isOpen: false })} type="submit" >Submit</CompButton>
                                    </ModalFooter>
                                </ModalBody>
                            </Form>
                        )}
                    </Mutation>
                </CompModal>

            </div>
        );
    }
}

export default Users;