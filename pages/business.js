import React from 'react';
import Business from '../components/Business';

const business = (props) => {
    return (
        <div>
            <Business currentUser={props.currentUser} />
        </div>
    );
};

export default business;