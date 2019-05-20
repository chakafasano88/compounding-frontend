import React from 'react';
import Think from "../components/Think";


const Thinking = (props) => {
    return (
        <div>
            <Think currentUser={props.currentUser} />
        </div>
    );
};

export default Thinking;
