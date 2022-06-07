import React, { useState } from 'react';
import LoginModal from './LoginModal';
// import Modal from './Modal';
import Button from './Button';

const LoginButton = ({ setLoggedIn }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setLoggedIn(false);
  };

  return (
    <div>
      <Button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        onClick={handleShow}
      >
        Login
      </Button>
      {/* <Modal id='exampleModal'>fdf</Modal> */}
      <LoginModal setLoggedIn={setLoggedIn} show={show} onClose={handleClose} />
    </div>
  );
};

export default LoginButton;
