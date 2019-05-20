import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import Post from "../components/Post";

class PostList extends Component {
   
    render() {
        const { posts, currentUser } = this.props;
        return (
            <div>
                {posts.map(post => <Post post={post} currentUser={currentUser} key={post.id} />)}
            </div>
        );
    }
}

export default PostList;