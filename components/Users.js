import React, { Component } from 'react';
import { Table, CardHeader, CardBody, Button, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import CompCard from './common/card/Card';
import CompButton from './common/button/Button';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
    mutation CREATE_USER_MUTATION($name: String!){
        createUser(name: $string) {
            id
        }
    }
`

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }


    _toggleUserModal = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen })
    }

    render() {
        return (
            <div>
                <CompCard>
                    <CardHeader className="d-flex justify-content-between align-items-center">Users
                        <Button type="button" onClick={this._toggleUserModal} color="default">Add User</Button>
                    </CardHeader>
                    <CardBody>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </CompCard>

                <Mutation mutation={CREATE_USER_MUTATION} >
                    {(createUser, { error, loading, called }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();

                            const res = await createUser();
                        }}>
                            <ModalBody>
                                <FormGroup>
                                    <Label>Comment</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        placeholder="Enter comment..."
                                        onChange={this._saveToState}
                                    >
                                    </Input>
                                </FormGroup>

                                <ModalFooter>
                                    <CompButton onClick={e => this.setState({ isOpen: false })} type="submit" >Submit</CompButton>
                                </ModalFooter>
                            </ModalBody>
                        </Form>
                    )}
                </Mutation>

            </div>
        );
    }
}

export default Users;