import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const RegisterSuccessModal = ({ show, onClose, userName }) => {
  const closeModal = () => {
    onClose();
  };

  const login = () => {
    onClose();
    console.log('login');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Thank you {userName} for subscribing to our site!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={login}>
          Login
        </Button>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterSuccessModal;
