import React, { useState } from 'react';
import LoginModal from './LoginModal';

const LoginButton = ({ setLoggedIn }) => {
  const [show, setShow] = useState(false);

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
      <LoginModal setLoggedIn={setLoggedIn} show={show} onClose={handleClose} />
    </div>
  );
};

export default LoginButton;
