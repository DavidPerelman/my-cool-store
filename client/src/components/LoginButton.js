import React, { useState } from 'react';
import LoginModal from './LoginModal';
import Modal from './Modal';
import Button from './Button';
import Form from './Form';
import {
  isFormFieldsValid,
  isValidPassword,
  isValidEmail,
} from '../utils/formValidation';
import AuthService from '../services/AuthServices';

const LoginButton = ({ setLoggedIn }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

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
    if (
      isFormFieldsValid(
        loginData.firstName,
        loginData.lastName,
        loginData.email,
        loginData.password,
        loginData.verifyPassword
      )
    ) {
      setError('all fields required!');
    } else if (isValidPassword(loginData.password, loginData.verifyPassword)) {
      setError(
        'Password must be at least 6 characters long and the passwords must be identical'
      );
    } else if (!isValidEmail(loginData.email)) {
      setError('invalid email!');
    } else {
      setError('');
    }
    try {
      AuthService.login(loginData);
      clearFormFields();
    } catch (err) {
      console.log(err.response.data.errMessage);
      setError(err.response.data.errMessage);
    }

    const clearError = setTimeout(clearErrorMessage, 3000);
    function clearErrorMessage() {
      setError('');
    }
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
        <Modal
          show={show}
          onClose={handleClose}
          title='Login'
          onSubmit={login}
          error={error}
        >
          <Form data={loginData} handleFormChange={handleFormChange}></Form>
        </Modal>
      )}
      {/* <LoginModal setLoggedIn={setLoggedIn} show={show} onClose={handleClose} /> */}
    </div>
  );
};

export default LoginButton;
