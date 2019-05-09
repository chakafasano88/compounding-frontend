import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, Label, Row, ListGroup, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card';

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    post(where: {id: $id}) {
      id
      description
      title
      types
      postedBy { 
          id
          name
          email
      }
    }
  }
`;

class SinglePost extends Component {
    render() {
        const { postId } = this.props
        return (
            <div>
                <Query query={SINGLE_POST_QUERY} variables={{ id: postId }} >
                    {({data, error, loading}) => (
                    <CompCard>
                        <CardHeader>{data.post.title.toUpperCase()}</CardHeader>
                        <CardBody>
                            <div dangerouslySetInnerHTML={{ __html: `${data.post.description}` }}/>
                        </CardBody>
                    </CompCard> 
                )}
                </Query>
            </div>
        );
    }
}

export default SinglePost;