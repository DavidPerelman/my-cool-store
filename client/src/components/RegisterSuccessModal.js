import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const RegisterSuccessModal = ({ show, onClose }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          To confirm the register, We sent you email with link, please enter the
          link to confirm the registration
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterSuccessModal;
