import React from 'react';
import ReactLoading from "react-loading";

const Loader = () => {
    return (
        <div className="loader__backdrop">
            <ReactLoading className="loader" type="spin" color="rgb(77, 214, 148)" />
        </div>
    );
};

export default Loader;