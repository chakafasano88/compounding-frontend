import React from 'react';
import CreatePost from "../components/CreatePost";
import SinglePost from "../components/SinglePost";

const post = (props) => {
    return (
        <div>
            {!props.query.id && <CreatePost />} 
            {props.query.id && <SinglePost currentUser={props.currentUser} postId={props.query.id} />}
        </div>
    );
};

export default post;
