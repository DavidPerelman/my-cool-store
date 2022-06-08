import React, { useState } from 'react';
import LoginModal from './LoginModal';
import Modal from './Modal';
import Button from './Button';
import Form from './Form';
import AuthService from '../services/AuthServices';

const LoginButton = ({ setLoggedIn }) => {
  const [show, setShow] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (e, valKey) => {
    console.log(loginData);
    const { value } = e.target;
    setLoginData((prevState) => {
      return { ...prevState, [valKey]: value };
    });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    clearFormFields();
    setShow(false);
    setLoggedIn(false);
  };

  const clearFormFields = () => {
    for (let field in loginData) {
      loginData[field] = '';
    }
  };

  const login = () => {
    AuthService.login(loginData);
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
        <Modal show={show} onClose={handleClose} title='Login' onSubmit={login}>
          <Form data={loginData} handleFormChange={handleFormChange}></Form>
        </Modal>
      )}
      {/* <LoginModal setLoggedIn={setLoggedIn} show={show} onClose={handleClose} /> */}
    </div>
  );
};

export default LoginButton;
