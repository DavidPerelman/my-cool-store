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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
  }); // new way etgar

  console.log(registerData.firstName);

  const register = async (e) => {
    e.preventDefault();

    const registerData = {
      firstName,
      lastName,
      email,
      password,
      verifyPassword,
    };

    if (
      isFormFieldsValid(firstName, lastName, email, password, verifyPassword)
    ) {
      setError('all fields required!');
    } else if (isValidPassword(password, verifyPassword)) {
      setError(
        'Password must be at least 6 characters long and the passwords must be identical'
      );
    } else if (!isValidEmail(email)) {
      setError('invalid email!');
    } else {
      setError('');
      try {
        let res = await axios.post('/user/register', registerData);
        setRegistered(true);
        clearFormFields();
        console.log(res);
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

  const registerForm = () => {
    setRegistered(true);
  };

  const closeModal = () => {
    onClose();
    clearFormFields();
  };

  const clearFormFields = () => {
    for (const property in registerData) {
      registerData[property] = '';
    }
    // setFirstName('');
    // setLastName('');
    // setEmail('');
    // setPassword('');
    // setVerifyPassword('');
  };

  const handleFormChange = (e) => {
    const { value } = e.target;
    setRegisterData((prevState) => {
      return { ...prevState, firstName: value };
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
              <div className='mb-3'>
                <label htmlFor='exampleInputFirstName1' className='form-label'>
                  First Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleInputFirstName1'
                  aria-describedby='firstNameHelp'
                  onChange={handleFormChange}
                  // onChange={(e) => setFirstName(e.target.value)}
                  value={registerData.firstName}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='exampleInputLastName1' className='form-label'>
                  Last Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleInputLastName1'
                  aria-describedby='lastNameHelp'
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='exampleInputEmail1' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='exampleInputPassword1' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleInputVerifyPassword1'
                  className='form-label'
                >
                  Verify Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputVerifyPassword1'
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  value={verifyPassword}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='primary' onClick={register}>
              Register
            </Button>
            <Button variant='primary' onClick={registerForm}>
              RegisterForm
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
