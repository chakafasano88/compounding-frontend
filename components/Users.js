import React, { Component } from 'react';
import { Table, CardHeader, CardBody, Button, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import CompCard from './common/card/Card';
import CompButton from './common/button/Button';
import CompModal from './common/modal/Modal';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import generateUuid from '../lib/uuidGen';
import Error from '../components/ErrorMessage';
import { toast } from 'react-toastify';

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

const DELETE_USER_MUTATION = gql`
    mutation DELETE_USER_MUTATION($userId: ID!) {
        deleteUser(userId: $userId) {
            id
        }
    }
`

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
            email: null,
            firstName: null,
            lastName: null,
            password: generateUuid(),
            permissions: 'USER',
            permissionTypes: [{
                id: 'USER',
                name: 'User'
            }, {
                id: 'ADMIN',
                name: 'Admin'
            }],
            formSubmitted: false,
            formProcessing: false
        }
    }


    _toggleUserModal = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen, formProcessing: false })
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value, formProcessing: false });
    }

    _isInvalid = () => {
        const { firstName, lastName, permissions, email } = this.state;

        if (firstName && lastName && permissions && email) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { firstName, lastName, permissions, password, email, permissionTypes, formSubmitted, formProcessing } = this.state;
        const { currentUser } = this.props;
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
                                const filteredUsers = users.filter(user => user.id !== currentUser.id)
                                return (
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Level</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers && filteredUsers.map((user, i) => (
                                                <tr key={i} >
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.permissions[0]}</td>
                                                    <td>{user.status === 1 ? 'Active' : 'Inactive'}</td>
                                                    <Mutation 
                                                        mutation={DELETE_USER_MUTATION} 
                                                        variables={{ userId: user.id }} 
                                                        refetchQueries={[{ query: ALL_USERS_QUERY }]}
                                                    >
                                                        {(deleteUser, { called, loading, data, error }) => {
                                                            return(
                                                                <td className="d-flex justify-content-end">
                                                                    <Button 
                                                                        onClick={async e => { 
                                                                            const res = await deleteUser();
                                                                            toast.success('User deleted!')
                                                                        }} 
                                                                        color="danger" 
                                                                        size="sm"
                                                                    >
                                                                    Delete
                                                                    {/* <FontAwesomeIcon 
                                                                        color="white" 
                                                                        icon="trash-alt">
                                                                        </FontAwesomeIcon> */}
                                                                    </Button>
                                                                </td>
                                                            );
                                                        }}
                                                    </Mutation>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                );
                            }}
                        </Query>
                    </CardBody>
                </CompCard>
                <CompModal isOpen={this.state.isOpen} toggle={this._toggleUserModal} onClosed={this._onModalClosed}>
                    <ModalHeader>Create a User</ModalHeader>
                    <Mutation
                        mutation={CREATE_USER_MUTATION}
                        variables={{ firstName, lastName, email, permissions, password }}
                        refetchQueries={[{ query: ALL_USERS_QUERY }]}
                    >
                        {(createUser, { called, loading, data, error }) => (
                            <Form method="post" onSubmit={async e => {
                                e.preventDefault();
                                this.setState({ formSubmitted: true, formProcessing: true, password: generateUuid() })

                                const res = await createUser();

                                if (res.data) this.setState({ isOpen: false })
                                toast.success('User Created!')
                            }}>
                                {formProcessing && error && <Error error={error} />}
                                <ModalBody>
                                    <FormGroup>
                                        <Label>First Name</Label>
                                        <Input
                                            className={formSubmitted && !firstName ? "is-invalid" : ''}
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name..."
                                            onChange={this._saveToState}
                                        >
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Last Name</Label>
                                        <Input
                                            className={formSubmitted && !lastName ? "is-invalid" : ''}
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name..."
                                            onChange={this._saveToState}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            className={formSubmitted && !email ? "is-invalid" : ''}
                                            type="email"
                                            name="email"
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
                                        <CompButton
                                            onClick={e => { if (error && !loading) return }}
                                            icon="cog"
                                            loading={loading}
                                            type="submit" >Submit
                                        </CompButton>
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