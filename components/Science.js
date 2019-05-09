import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, Label, Row, ListGroup, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card'
import Post from './Post';
import Loader from "./Loader";
import PostList from "../components/PostList";
import { POSTS_QUERY } from './Think';

class Science extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const filter = { filterTerm: "SCIENCE" };
        return (
            <div>
                <Row className="no-gutter" >
                    <Col sm={8}>
                        <CompCard>
                            <CardHeader>Science Articles</CardHeader>
                            <CardBody>
                                <Query query={POSTS_QUERY} variables={filter} >
                                    {({ data, error, loading }) => {
                                        if (loading) return <p>Loading...</p>;
                                        if (error) return <p>Error: {error.message}</p>;
                                        return (
                                            <div>
                                                <PostList posts={data.posts} />
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

export default Science;
export { POSTS_QUERY };
