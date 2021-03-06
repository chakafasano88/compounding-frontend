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
import SubNav from '../components/common/sub-nav/SubNav';
import FocusWrapper from '../components/common/focus-wrapper/FocusWrapper';

class Business extends Component {
    constructor(props) {
        super(props)

        this.state = {
            linkIdNames: {
                thinking: 'business__thinking',
                business: 'business__business',
                science: 'business__science',
                investing: 'business__science'
            }
        }
    }

    componentDidMount() {
        this.businessWrapper.focus();
    }

    render() {
        const { thinking, business, science, investing } = this.state.linkIdNames;
        const filter = { filter: "BUSINESS" };
        const { currentUser } = this.props;
        return (
            <FocusWrapper navPrefix={true} linkIds={this.state.linkIdNames} refName={(c) => { this.businessWrapper = c; }} >
                <SubNav className="mb-4" />
                <Row className="no-gutter" >
                    <Col sm={8}>
                        <CompCard>
                            <CardHeader>Business Articles</CardHeader>
                            <CardBody>
                                <Query query={POSTS_QUERY} variables={filter} >
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
            </FocusWrapper>
        );
    }
}

export default Business;
export { POSTS_QUERY };
