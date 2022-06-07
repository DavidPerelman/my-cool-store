import React, { useState } from 'react';
import LoginModal from './LoginModal';
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
      <Button type='button' className='btn btn-primary' onClick={handleShow}>
        Login
      </Button>
      <LoginModal setLoggedIn={setLoggedIn} show={show} onClose={handleClose} />
    </div>
  );
};

export default LoginButton;
