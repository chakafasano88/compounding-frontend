import React from 'react';
import CreatePost from "../components/CreatePost";
import SinglePost from "../components/SinglePost";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    post(where: {id: $id}) {
      id
      description
      title
      types
      votes {
        id
        user {
            id
        }
    }
    comments {
        id
        description
        createdAt
        user {
            id
            email
            firstName
            lastName
            profileImage
            
        }
    }
      postedBy { 
          id
          firstName
          lastName
          email
      }
    }
  }
`;

const post = (props) => {
    return (
        <div>
            {!props.query.id && <CreatePost />}
            {props.query.id &&
                <Query query={SINGLE_POST_QUERY} variables={{ id: props.query.id }}>
                    {({ data, error, loading }) => {
                        const { post } = data;
                        return (<SinglePost currentUser={props.currentUser} post={post} />)
                    }}
                </Query>
            }
        </div>
    );
};

export default post;
