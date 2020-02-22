import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const IdleTimeOutModal = ({
  showModal,
  handleClose,
  handleLogout,
  remainingTime
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>You Have Been Idle!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your Session has Please Login Again</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLogout}>
          Log In Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
