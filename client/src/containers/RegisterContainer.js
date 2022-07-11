import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthServices';
import {
  isFormFieldsValid,
  isValidPassword,
  isValidEmail,
  isLoginFormFieldsValid,
} from '../utils/formValidation';
import Form from '../components/Form';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

const RegisterContainer = ({ setRegisterSuccess, loggedIn }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  const handleFormChange = (e, valKey) => {
    const { value } = e.target;
    setRegisterData((prevState) => {
      return { ...prevState, [valKey]: value };
    });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    clearFormFields();
    setShow(false);
  };

  const clearFormFields = () => {
    for (let field in registerData) {
      registerData[field] = '';
    }
  };

  const showError = (error) => {
    setError(error);

    const clearError = setTimeout(() => {
      setError('');
    }, 3000);
  };

  const register = async () => {
    if (!isFormFieldsValid(registerData))
      return showError('all fields required!');

    if (isValidPassword(registerData.password, registerData.verifyPassword))
      return showError(
        'Password must be at least 6 characters long and the passwords must be identical'
      );

    if (!isValidEmail(registerData.email)) return showError('invalid email');

    try {
      const res = await AuthService.register(registerData);
      if (!res.data) {
        showError(res);
      } else if (res.data.success) {
        setRegisterSuccess(true);
        handleClose();
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      setTimeout(() => {
        if (show) {
          document
            .getElementsByClassName('user-popover')[0]
            .lastChild.classList.add('keep-show-modal');
        }
        if (!show) {
          document
            .getElementsByClassName('user-popover')[0]
            .lastChild.classList.remove('keep-show-modal');
        }
      }, 100);
    }
  }, [show]);

  return (
    <>
      <Button
        type='button'
        size='user-buttons'
        color='button--primary'
        onClick={handleShow}
      >
        Register
      </Button>
      {show && (
        <Modal
          show={show}
          onClose={handleClose}
          title='Register'
          textButton='Register'
          onSubmit={register}
          error={error}
        >
          <Form data={registerData} handleFormChange={handleFormChange}></Form>
        </Modal>
      )}
    </>
  );
};

export default RegisterContainer;
