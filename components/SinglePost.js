import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import {
    Badge,
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import CompCard from '../components/common/card/Card';
import CompModal from '../components/common/modal/Modal';
import CompButton from '../components/common/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from './ErrorMessage';
import Loader from './Loader';
import { Mutation } from 'react-apollo';
import { POST_VOTE_MUTATION, POST_COMMENT_MUTATION } from './Post';
import { POSTS_QUERY } from './Think';
import { CREATE_POST_MUTATION } from './CreatePost';
import { toast } from 'react-toastify';


let ReactQuill = null

class SinglePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            editor: false,
            isEditing: false,
            toolBarOptions: {
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                    { 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    ['link', 'image', 'video'],
                    ['clean']
                ]
            },
            types: 'THINKING',
            typeOptions: [{
                id: 'THINKING',
                name: 'Thinking'
            }, {
                id: 'BUSINESS',
                name: 'Business'
            }, {
                id: 'SCIENCE',
                name: 'Science'
            }, {
                id: 'INVESTING',
                name: 'Investing'
            }],
            description: null,
            formSubmitted: false
        }
    }

    _toggleCommentModal = () => {
        const { isOpen } = this.state;
        if (!this.props.currentUser) {
            return toast.error('You must logged in to do that!');
        }

        this.setState({ isOpen: !isOpen })
    }

    _saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value, formProcessing: false });
    }

    _handleEditorChange = (value) => {
        this.setState({ description: value, formProcessing: false })
    }

    _viewComments = () => {
        const { showComments } = this.state;
        this.setState({ showComments: !showComments })
    }

    _editPost = () => {
        ReactQuill = require('react-quill');
        const { isEditing } = this.state;
        const { description, title, types } = this.props.post;

        if (ReactQuill) {
            this.setState({ editor: true })
            this.setState({ isEditing: !isEditing, description, title, types: types[0] })
        }
    }

    render() {
        const { post, currentUser } = this.props
        const {
            showComments,
            isEditing,
            editor,
            toolBarOptions,
            description,
            title,
            types,
            formProcessing,
            formSubmitted,
            typeOptions
        } = this.state;
        console.log("current", currentUser)
        return (
            <div>
                <CompCard className={`${isEditing && 'editor'}`} >
                    <CardHeader className="d-flex justify-content-between align-items-center">{post.title.toUpperCase()}
                        {currentUser && currentUser.permissions[0] === 'ADMIN' && (
                            <Button
                                type="button"
                                size="sm"
                                onClick={this._editPost}
                                color="primary">
                                <FontAwesomeIcon size="sm" icon="edit" color="white"> </FontAwesomeIcon> Edit
                        </Button>)}

                    </CardHeader>
                    <CardBody>
                        {editor && isEditing && (
                            <Mutation
                                mutation={CREATE_POST_MUTATION}
                                variables={{ description, title, types, postId: post.id }}
                                refetchQueries={[{ query: POSTS_QUERY, variables: { filter: types } }]}
                            >
                                {(createPost, { loading, data, error }) => (
                                    <Form name="editorForm" method="post" onSubmit={async e => {
                                        e.preventDefault();
                                        this.setState({ formSubmitted: true, formProcessing: true })

                                        const res = await createPost();
                                        toast.success('Post updated!')
                                        this.setState({ isEditing: false })
                                    }}
                                    >
                                        {formProcessing && error && <Error error={error} />}
                                        {loading && <Loader />}
                                        <>
                                        <Row>
                                            <Col sm={6}>
                                                <FormGroup>
                                                    <Label>Title</Label>
                                                    <Input
                                                        invalid={formSubmitted && !title}
                                                        type="text"
                                                        name="title"
                                                        value={title}
                                                        placeholder="Enter title..."
                                                        onChange={this._saveToState}
                                                    >
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm={6}>
                                                <FormGroup>
                                                    <Label>Article Type</Label>
                                                    <select className="form-control" name="types" value={types} onChange={this._saveToState}>
                                                        {typeOptions.map((type, i) => (
                                                            <option key={i} value={type.id}>{type.name}</option>
                                                        ))}
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Label>Description</Label>
                                        <ReactQuill
                                            className={formSubmitted && !description ? "is-invalid" : ''}
                                            theme="snow"
                                            value={description}
                                            onChange={this._handleEditorChange}
                                            modules={toolBarOptions}
                                        />

                                        <div className="d-flex justify-content-end mt-3">
                                            <CompButton icon="cog" color="primary" className="full-width">Submit</CompButton>
                                        </div>
                                        </>
                                    </Form>
                                )}
                            </Mutation>
                        )}
                        {!isEditing && (
                            <>
                            <div dangerouslySetInnerHTML={{ __html: `${post.description}` }} />
                            <Row className="post-info__row">
                                <Col sm={12} className="post-info__column">
                                    {post.votes && post.votes.length > 0 && (<p className="mr-1" >{post.votes.length} <FontAwesomeIcon size="sm" color="coral" icon="heart"></FontAwesomeIcon></p>)}
                                    {post.comments && post.comments.length > 0 && (<a onClick={this._viewComments} ><p>{post.comments.length} {post.comments.length > 1 ? 'Comments' : 'Comment'}</p></a>)}
                                </Col>
                            </Row>
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
                            </>
                        )}
                    </CardBody>
                </CompCard>
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

export default SinglePost;