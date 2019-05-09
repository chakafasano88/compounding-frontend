import React from "react";
import { Card } from "reactstrap";
import "./card.scss";

const CompCard = props => {
  let { className } = props;
  if ("undefined" === typeof className) {
    className = "";
  }
  return (
    <div className="comp-card-wrapper">
      <Card {...props} className={`comp-card ${className}`}>
        {props.children}
      </Card>
    </div>
  );
};

export default CompCard;
