import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { Badge, Button, CardBody, CardFooter, CardHeader, Col, Form, Label, Row, ListGroup, ListGroupItem } from "reactstrap";
import CompCard from '../components/common/card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mutation } from 'react-apollo';
import { POST_VOTE_MUTATION, POST_COMMENT_MUTATION } from './Post';
import { POSTS_QUERY } from './Think';
import { toast } from 'react-toastify';
import Error from './ErrorMessage'

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
        user {
            id
            email
            firstName
            lastName
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



class SinglePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const { postId, currentUser } = this.props
        const { showComments } = this.state;
        return (
            <div>
                <Query query={SINGLE_POST_QUERY} variables={{ id: postId }} >
                    {({ data, error, loading }) => {
                        const { post } = data;
                        return (
                            <CompCard>
                                <CardHeader>{data.post.title.toUpperCase()}</CardHeader>
                                <CardBody>
                                    <div dangerouslySetInnerHTML={{ __html: `${post.description}` }} />
                                    <Row className="post-info__row">
                                        <Col sm={12} className="post-info__column">
                                            {post.votes && post.votes.length > 0 && (<p className="mr-1" >{post.votes.length} <FontAwesomeIcon size="sm" color="coral" icon="heart"></FontAwesomeIcon></p>)}
                                            {post.comments && post.comments.length > 0 && (<a onClick={this._viewComments} ><p>{post.comments.length} <FontAwesomeIcon size="sm" icon="comment"></FontAwesomeIcon></p></a>)}
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
                                                <Row>
                                                    <Col sm={12}>
                                                        <div className="comment-vote__wrapper">
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
                                                        </div>
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
                                </CardBody>
                            </CompCard>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default SinglePost;