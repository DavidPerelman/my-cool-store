import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const RegisterSuccessModal = ({ show, onClose, userName }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    onClose();
    navigate('/');
  };

  const login = () => {
    onClose();
    navigate('/');
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
