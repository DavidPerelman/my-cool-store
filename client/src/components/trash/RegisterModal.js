import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
  isFormFieldsValid,
  isValidPassword,
  isValidEmail,
} from '../utils/formValidation';
import axios from 'axios';

const RegisterModal = ({ show, onClose, registered, setRegistered }) => {
  const [error, setError] = useState('');

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
  }); // new way etgar

  const register = async (e) => {
    e.preventDefault();

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
      try {
        let res = await axios.post('/user/register', registerData);
        setRegistered(true);
        clearFormFields();
      } catch (err) {
        console.log(err.response.data.errMessage);
        setError(err.response.data.errMessage);
      }
    }

    const clearError = setTimeout(clearErrorMessage, 3000);

    function clearErrorMessage() {
      setError('');
    }
  };

  const closeModal = () => {
    onClose();
    clearFormFields();
  };

  const clearFormFields = () => {
    for (let field in registerData) {
      registerData[field] = '';
    }
  };

  const handleFormChange = (e, valKey) => {
    const { value } = e.target;
    setRegisterData((prevState) => {
      return { ...prevState, [valKey]: value };
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      {(registered && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Register Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              To confirm the register, We sent you email with link, please enter
              the link to confirm the registration
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )) || (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(error && (
              <div className='alert alert-danger' role='alert'>
                {error}
              </div>
            )) ||
              ''}
            <form>
              {Object.keys(registerData).map((field, i) => {
                return (
                  <div key={i}>
                    <label className='form-label'>
                      {field.charAt(0).toUpperCase() +
                        field
                          .slice(1)
                          .split(/(?=[A-Z])/)
                          .join(' ')}
                    </label>
                    <input
                      type={field || 'text'}
                      className='form-control'
                      id={field}
                      onChange={(e) => handleFormChange(e, field)}
                      value={registerData[field]}
                    />
                  </div>
                );
              })}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='primary' onClick={register}>
              Register
            </Button>
            <Button variant='primary' onClick={clearFormFields}>
              Clear Form
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default RegisterModal;
