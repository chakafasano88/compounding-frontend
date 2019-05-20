import React from 'react';
import Investing from '../components/Investing';

const investing = (props) => {
    return (
        <div>
            <Investing currentUser={props.currentUser} />
        </div>
    );
};

export default investing;