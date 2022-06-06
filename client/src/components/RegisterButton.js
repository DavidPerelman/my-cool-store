import React, { useState } from 'react';
import RegisterModal from './RegisterModal';

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
      <button type='button' className='btn btn-primary' onClick={handleShow}>
        Register
      </button>
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
