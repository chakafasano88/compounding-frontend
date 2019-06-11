import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, Label, Row, ListGroup, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card'
import Post from './Post';
import Loader from "./Loader";
import PostList from "../components/PostList";

const POSTS_QUERY = gql`
    query POSTS_QUERY($filter: String!){
        posts(filter: $filter) {
            id
            description
            url
            title
            types
            createdAt
            votes {
                id
                user {
                    id
                }
            }
            comments {
                id
                description
                user {
                    id
                    email
                    firstName
                    lastName
                }
            }
            postedBy { 
                id  
                email 
            }
        }
    }
`;

class Think extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { currentUser } = this.props;
        const filter = { filter: 'THINKING' }
        return (
            <div>
                <Row className="no-gutter" >
                    <Col sm={8}>
                        <CompCard>
                            <CardHeader>Thinking Articles</CardHeader>
                            <CardBody>
                                <Query query={POSTS_QUERY} variables={filter} refetchQueries={[{ query: POSTS_QUERY }]}>
                                    {({ data, error, loading }) => {
                                        if (loading) return <p>Loading...</p>;
                                        if (error) return <p>Error: {error.message}</p>;
                                        return (
                                        <div>
                                           <PostList posts={data.posts} currentUser={currentUser} />
                                        </div>
                                        );
                                    }}
                                </Query>
                            </CardBody>
                        </CompCard>
                    </Col>
                    <Col sm={4}>
                        <CompCard>
                            <CardHeader>Trending Articles</CardHeader>
                            <CardBody>
                            </CardBody>
                        </CompCard>           
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Think;
export { POSTS_QUERY };
