import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const LoginModal = ({ show, onClose, loggedIn, setLoggedIn }) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !password) {
      setError('all fields required!');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
    } else if (!regexp.test(email)) {
      setError('invalid email!');
    } else {
      setError('');
      try {
        let res = await axios.post('/user/login', loginData);
        setLoggedIn(true);
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

  const loginForm = () => {
    setLoggedIn(true);
  };

  const closeModal = () => {
    onClose();
    clearFormFields();
  };

  const clearFormFields = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Cancel
        </Button>
        <Button variant='primary' onClick={login}>
          Login
        </Button>
        <Button variant='primary' onClick={loginForm}>
          LoginForm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
