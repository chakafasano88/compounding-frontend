import React from 'react';
import CreatePost from "../components/CreatePost";
import SinglePost from "../components/SinglePost";

const post = (props) => {
    console.log("props", props.query)
    return (
        <div>
            {!props.query.id && <CreatePost />} 
            {props.query.id && <SinglePost postId={props.query.id} />}
        </div>
    );
};

export default post;
