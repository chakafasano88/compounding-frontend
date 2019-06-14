import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            firstName
            lastName
            company
            occupation
            email
            permissions
            profileImage
        }
    }
`;          


const User = (props) => (
    <Query {...props} fetchPolicy="network-only" query={CURRENT_USER_QUERY} >
        {payload => { return props.children(payload)} }
    </Query>
);

export default User;
export { CURRENT_USER_QUERY };