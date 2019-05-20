import React from 'react';
import ForgotRequest from '../components/ForgotRequest';
import Forgot from '../components/Forgot';

const forgot = (props) => {
    return (
        <div>
            {!props.query.resetToken && <ForgotRequest />}
            {props.query.resetToken && <Forgot resetToken={props.query.resetToken}  />}
        </div>
    );
};

export default forgot;