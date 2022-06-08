import React, { useState } from 'react';
import LoginModal from './LoginModal';
import Modal from './Modal';
import Button from './Button';

const LoginButton = ({ setLoggedIn }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setLoggedIn(false);
  };

  const login = () => {
    console.log('login');
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
      {show && (
        <Modal show={show} onClose={handleClose} title='Login' onSave={login}>
          {/* <form>
            <div>
              <label className='form-label'>label</label>
              <input
                type='text'
                className='form-control'
                // onChange={(e) => handleFormChange(e, field)}
                // value={registerData[field]}
              />
            </div>
          </form> */}
        </Modal>
      )}
      {/* <LoginModal setLoggedIn={setLoggedIn} show={show} onClose={handleClose} /> */}
    </div>
  );
};

export default LoginButton;
