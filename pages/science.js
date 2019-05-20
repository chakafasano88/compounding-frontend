import React from 'react';
import Science from '../components/Science';

const science = (props) => {
    return (
        <div>
            <Science currentUser={props.currentUser} />
        </div>
    );
};

export default science;