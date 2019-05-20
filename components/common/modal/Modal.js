import React from "react";
import { Modal } from "reactstrap";
import "./modal.scss";

const CompModal = props => {
  const { className } = props;
  return (
    <Modal {...props} className={`comp-modal ${className}`}>
      {props.children}
    </Modal>
  );
};

export default CompModal;
