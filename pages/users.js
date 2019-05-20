import React from 'react';
import Users from "../components/Users";


const users = (props) => {
    return (
        <div>
            <Users currentUser={props.currentUser} />
        </div>
    );
};

export default users;
