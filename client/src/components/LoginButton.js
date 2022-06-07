import React, { useState } from 'react';
import LoginModal from './LoginModal';

const LoginButton = () => {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setLoggedIn(false);
  };

  return (
    <div>
      <button type='button' className='btn btn-primary' onClick={handleShow}>
        Login
      </button>
      <LoginModal
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        show={show}
        onClose={handleClose}
      />
    </div>
  );
};

export default LoginButton;
