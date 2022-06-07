import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import Button from './Button';

const RegisterButton = () => {
  const [show, setShow] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setRegistered(false);
  };

  return (
    <div>
      <Button type='button' className='btn btn-primary' onClick={handleShow}>
        Register
      </Button>
      <RegisterModal
        registered={registered}
        setRegistered={setRegistered}
        show={show}
        onClose={handleClose}
      />
    </div>
  );
};

export default RegisterButton;
