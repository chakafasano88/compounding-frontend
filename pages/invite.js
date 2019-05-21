import React from 'react';
import Invite from '../components/Invite';

const invite = (props) => {
    return (
        <div>
            <Invite 
                inviteToken={props.query.inviteToken} 
                currentUser={props.currentUser} 
            />
        </div>
    );
};

export default invite;