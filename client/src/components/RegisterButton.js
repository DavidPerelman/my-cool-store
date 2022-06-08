import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import Modal from './Modal';
import Button from './Button';

const RegisterButton = () => {
  const [show, setShow] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setRegistered(false);
  };

  const register = () => {
    console.log('register');
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
          onSave={register}
        >
          {/* <form>
            <div>
              <label className='form-label'>label</label>
              <input
                type='text'
                className='form-control'
                // onChange={(e) => handleFormChange(e, field)}
                // value={registerData[field]}
              />
            </div>
          </form> */}
        </Modal>
      )}
    </div>
  );
};

export default RegisterButton;
