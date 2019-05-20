import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompButton = props => {
  return (
    <div>
        <Button className={props.className} type={props.type} color={props.color} onClick={props.onClick}>
          {props.loading && (<FontAwesomeIcon spin color="white" icon={props.icon}></FontAwesomeIcon>)} {props.children}
        </Button>
    </div>
  );
};

export default CompButton;
