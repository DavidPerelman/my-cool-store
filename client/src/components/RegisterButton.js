import React, { useState } from 'react';
import AuthService from '../services/AuthServices';
import {
  isFormFieldsValid,
  isValidPassword,
  isValidEmail,
} from '../utils/formValidation';
import Form from './Form';
import Modal from './Modal';
import Button from './Button';

const RegisterButton = ({ setRegisterSuccess }) => {
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

  const register = async () => {
    if (
      isFormFieldsValid(
        registerData.firstName,
        registerData.lastName,
        registerData.email,
        registerData.password,
        registerData.verifyPassword
      )
    ) {
      setError('all fields required!');
    } else if (
      isValidPassword(registerData.password, registerData.verifyPassword)
    ) {
      setError(
        'Password must be at least 6 characters long and the passwords must be identical'
      );
    } else if (!isValidEmail(registerData.email)) {
      setError('invalid email!');
    } else {
      setError('');
    }
    try {
      const res = await AuthService.register(registerData);
      if (!res.data) {
        setError(res);
      } else if (res.data.success) {
        setRegisterSuccess(true);
        handleClose();
      }
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
      <Button type='button' className='btn btn-primary' onClick={handleShow}>
        Register
      </Button>
      {/* <RegisterModal
        registered={registered}
        setRegistered={setRegistered}
        show={show}
        onClose={handleClose}
      /> */}
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
    </div>
  );
};

export default RegisterButton;
