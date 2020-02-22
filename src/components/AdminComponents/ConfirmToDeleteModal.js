import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ConfirmToDeleteModal = ({ showModal, handleRemove, handleNo }) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={handleNo}
    >
      <Modal.Header closeButton>
        <Modal.Title>Permission!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want Delete the menu Item?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary " onClick={handleNo}>
          No
        </Button>
        <Button variant="warning" onClick={handleRemove}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
