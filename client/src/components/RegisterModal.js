import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const RegisterModal = ({ show, onClose }) => {
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();

    const registerData = {
      firstName,
      lastName,
      email,
      password,
      verifyPassword,
    };

    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!firstName || !lastName || !email || !password || !verifyPassword) {
      setError('all fields required!');
    } else if (password !== verifyPassword) {
      setError('the passwords not match!');
    } else if (password.length < 6 || verifyPassword.length < 6) {
      setError('Password must be at least 6 characters long!');
    } else if (!regexp.test(email)) {
      setError('invalid email!');
    } else {
      setError('');
      try {
        await axios.post('http://localhost:3000/user/register', registerData, {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }

    const clearError = setTimeout(clearErrorMessage, 3000);

    function clearErrorMessage() {
      setError('');
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
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
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
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
            <label htmlFor='exampleInputVerifyPassword1' className='form-label'>
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
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='primary' onClick={register}>
          RegisterModal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
