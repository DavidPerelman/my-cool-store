import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import { register } from '../services/AuthServices';
import Form from './Form';
import Modal from './Modal';
import Button from './Button';

const RegisterButton = () => {
  const [show, setShow] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
  }); // new way etgar

  const handleFormChange = (e, valKey) => {
    console.log(registerData);
    const { value } = e.target;
    setRegisterData((prevState) => {
      return { ...prevState, [valKey]: value };
    });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    clearFormFields();
    setShow(false);
    setRegistered(false);
  };

  // const register = () => {
  //   console.log('register');
  //   console.log(registerData);
  // };

  const clearFormFields = () => {
    for (let field in registerData) {
      registerData[field] = '';
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
          onSubmit={register}
        >
          <Form data={registerData} handleFormChange={handleFormChange}></Form>
        </Modal>
      )}
    </div>
  );
};

export default RegisterButton;
