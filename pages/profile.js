import React from 'react';
import Profile from '../components/Profile';

const ProfilePage = (props) => {
    return (
        <div>
            <Profile currentUser={props.currentUser} />
        </div>
    );
};

export default ProfilePage;