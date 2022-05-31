import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const RegisterModal = ({ show, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          {/* <button type='submit' className='btn btn-primary'>
            Submit
          </button> */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='primary' onClick={onClose}>
          RegisterModal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
