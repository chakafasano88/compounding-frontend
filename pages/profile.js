import React from 'react';
import Profile from '../components/Profile';

const ProfilePage = (props) => {
    return (
        <div>
            {props.currentUser && (<Profile currentUser={props.currentUser} />)}
        </div>
    );
};

export default ProfilePage;