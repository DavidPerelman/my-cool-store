import React, { useState } from 'react';
import LoginModal from './LoginModal';
import Modal from './Modal';
import Button from './Button';
import Form from './Form';
import { isLoginFormFieldsValid, isValidEmail } from '../utils/formValidation';
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
  };

  const clearFormFields = () => {
    for (let field in loginData) {
      loginData[field] = '';
    }
  };

  const login = async () => {
    if (isLoginFormFieldsValid(loginData.email, loginData.password)) {
      setError('all fields required!');
      console.log(error);
    } else if (!isValidEmail(loginData.email)) {
      setError('invalid email!');
      console.log(error);
    } else {
      setError('');
    }
    try {
      const res = await AuthService.login(loginData);
      if (!res.data) {
        setError(res);
      } else if (res.data.isLogin) {
        setLoggedIn(res.data.isLogin);
      }
    } catch (err) {
      console.log(err);
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
