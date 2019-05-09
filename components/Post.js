import React, { Component } from 'react';
import { Row, Col, Form } from "reactstrap";
import { POSTS_QUERY } from './Think';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const POST_LIKE_MUTATION = gql`
    mutation POST_LIKE_MUTATION($postId: ID!) {
            vote(postId: $postId) {
                user {
                    name
                }
                post {
                    title
                }
            }
    }
`

class Post extends Component {
    constructor(props) {
        super(props)
    }

    _navigate = () => {
        const { post } = this.props;
        Router.push(`/post?id=${post.id}`)
    }

    render() {
        const { post } = this.props;

        return (
            <div>
                <Mutation
                    mutation={POST_LIKE_MUTATION}
                    variables={{ postId: post.id }}
                    refetchQueries={[{ query: POSTS_QUERY }]}>

                    {(vote, { error, loading, data }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();
                            const res = await vote();

                        }}>
                            <Row className="card-row" onClick={this._navigate}>
                                <Col sm={12}>
                                    <div className="d-flex">
                                        <img
                                            className="card-row__img-avatar"
                                            src="https://image.shutterstock.com/image-vector/man-avatar-profile-picture-vector-260nw-229692004.jpg"
                                            alt=""
                                        />
                                        <div className="card-row__details">
                                            <span className="card-row__title">
                                            </span>
                                            <div className="card-row__dates">{`${moment(post.date_created).format("MMMM Do YYYY, h:mm a")}`}</div>
                                            {/* {post.comment && (
                                            <div className="card-row__comment">
                                                <i className="fa fa-exclamation-triangle" />
                                                {post.comment}
                                            </div>
                                            )} */}
                                            {post.display_text !== "" && (
                                                <div className="card-row__message">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: `${post.description}` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {post.post_image && (
                                        <div>
                                            <img
                                                className="card-row__post-img"
                                                // src={post.post_image}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <FontAwesomeIcon></FontAwesomeIcon>
                        </Form>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default Post;