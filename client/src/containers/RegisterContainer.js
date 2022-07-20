import React, { useState, useContext } from 'react';
import AuthService from '../services/AuthServices';
import {
  isFormFieldsValid,
  isValidPassword,
  isValidEmail,
} from '../utils/formValidation';
import Form from '../components/Form';
import Modal from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import Button from '../components/Button/Button';

const RegisterContainer = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [error, setError] = useState('');
  const { setRegisterModalOpen } = useContext(AuthContext);

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
    setRegisterModalOpen(false);
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
        handleClose();
        navigate('/confirmRegister');
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <>
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
          <div className='modal-footer'>
            <Button
              size='user-modal-button'
              color='button--close'
              onClick={handleClose}
            >
              Close
            </Button>
            <Button size='user-modal-button' onClick={register}>
              Register
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RegisterContainer;
