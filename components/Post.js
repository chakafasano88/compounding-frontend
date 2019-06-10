import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Label, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CompButton from '../components/common/button/Button';
import CompModal from '../components/common/modal/Modal';
import { POSTS_QUERY } from './Think';
import { toast } from 'react-toastify';
import Error from './ErrorMessage'

const POST_VOTE_MUTATION = gql`
    mutation POST_VOTE_MUTATION($postId: ID!) {
        createVote(postId: $postId) {
                id
                user {
                    id 
                }
                post {
                    id
                    title
                    types
                }
            }
    }
`
const POST_COMMENT_MUTATION = gql`
    mutation POST_COMMENT_MUTATION($postId: ID!, $description: String!) {
        createComment(postId: $postId, description: $description) {
                id
                description
            }
    }
`

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            showComments: false
        }
    }

    _toggleCommentModal = () => {
        const { isOpen } = this.state;
        if (!this.props.currentUser) {
            return toast.error('You must logged in to do that!');
        }

        this.setState({ isOpen: !isOpen })
    }

    _navigate = () => {
        const { post } = this.props;
        Router.push(`/post?id=${post.id}`)
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    _viewComments = () => {
        const { showComments } = this.state;
        this.setState({ showComments: !showComments })
    }

    render() {
        const { post, currentUser } = this.props;
        const { showComments } = this.state;

        let trimmedString = post.description.substr(0, 200);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        console.log("posst", post)
        return (
            <div>
                <Mutation
                    mutation={POST_VOTE_MUTATION}
                    variables={{ postId: post.id }}
                    refetchQueries={[{ query: POSTS_QUERY, variables: { filter: post.types[0] } }]}
                >

                    {(createVote, { error, loading, data }) => (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault();

                            const res = await createVote();
                        }}>
                            {<Error error={error} />}
                            <Row className="card-row" onClick={this._navigate}>
                                <Col sm={12}>
                                    <h6>{post.title}</h6>
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
                                            {post.description !== "" && (
                                                <div className="card-row__message">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: `${trimmedString}${trimmedString.length > 195 ? ('...') : ''}` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="comment-like__row" >
                                <Col className="comment-vote__column" sm={6}>
                                    <Button
                                        type="submit">
                                        <FontAwesomeIcon color={post.votes && currentUser && post.votes.find(p => p.user.id === currentUser.id) ? 'coral' : 'grey'} icon="heart"
                                        >
                                        </FontAwesomeIcon> Like
                                        </Button>
                                    <Button
                                        type="button"
                                        onClick={this._toggleCommentModal}
                                        className="comment__button"
                                    >
                                        <FontAwesomeIcon icon="comment"></FontAwesomeIcon> Comment
                                        </Button>
                                </Col>
                                <Col className="post-info__column" sm={6}>
                                    {post.votes.length > 0 && (
                                        <p className="mr-1" >{post.votes.length} <FontAwesomeIcon size="sm" color="coral" icon="heart"></FontAwesomeIcon></p>
                                    )}
                                    {post.comments.length > 0 && (
                                        <a onClick={this._viewComments} ><p>{post.comments.length} {post.comments.length > 1 ? 'Comments' : 'Comment'}</p></a>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    {showComments && (
                                        post.comments.map((comment, i) => (
                                            <div key={i} className="card-row__comment">
                                                <p><span className="user">{comment.user.firstName} {comment.user.lastName}</span> {comment.description}</p>
                                            </div>
                                        ))
                                    )}
                                </Col>
                                <Col sm={6}></Col>
                            </Row>
                        </Form>
                    )}
                </Mutation>

                <CompModal isOpen={this.state.isOpen} toggle={this._toggleCommentModal}>
                    <ModalHeader>Create a Comment</ModalHeader>
                    <Mutation
                        mutation={POST_COMMENT_MUTATION}
                        variables={{ postId: post.id, description: this.state.description }}
                        refetchQueries={[{ query: POSTS_QUERY, variables: { filter: post.types[0] } }]}
                    >
                        {(createComment, { error, loading, called }) => (
                            <Form method="post" onSubmit={async e => {
                                e.preventDefault();

                                const res = await createComment();
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
                </CompModal>
            </div>
        );
    }
}

export default Post;
export { POST_COMMENT_MUTATION, POST_VOTE_MUTATION };