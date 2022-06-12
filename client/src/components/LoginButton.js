import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Button from './Button';
import Form from './Form';
import { isLoginFormFieldsValid, isValidEmail } from '../utils/formValidation';
import AuthService from '../services/AuthServices';
import AuthContext from '../context/authContext';

const LoginButton = () => {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (e, valKey) => {
    const { value } = e.target;
    setLoginData((prevState) => {
      return { ...prevState, [valKey]: value };
    });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    clearFormFields();
    setShow(false);
  };

  const clearFormFields = () => {
    for (let field in loginData) {
      loginData[field] = '';
    }
  };

  const login = async () => {
    if (isLoginFormFieldsValid(loginData.email, loginData.password)) {
      setError('all fields required!');
    } else if (!isValidEmail(loginData.email)) {
      setError('invalid email!');
    } else {
      setError('');
      try {
        const res = await AuthService.login(loginData);
        if (!res.data) {
          setError(res);
        } else {
          console.log('loggedIn');
          await getLoggedIn();
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    }

    const clearError = setTimeout(clearErrorMessage, 3000);
    function clearErrorMessage() {
      setError('');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (show) {
        document
          .getElementsByClassName('wrapper')[1]
          .lastChild.classList.add('keep-show-modal');
      }
      if (!show) {
        document
          .getElementsByClassName('wrapper')[1]
          .lastChild.classList.remove('keep-show-modal');
      }
    }, 1000);
  }, [show]);

  const buttonStyle = {
    backgroundColor: 'blue',
    border: 'none',
    color: 'white',
    padding: '6px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '6px',
    width: '90%',
    marginTop: '5px',
  };

  return (
    <div>
      <Button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        style={buttonStyle}
        onClick={handleShow}
      >
        Login
      </Button>
      {show && (
        <Modal
          show={show}
          onClose={handleClose}
          title='Login'
          textButton='Login'
          onSubmit={login}
          error={error}
        >
          <Form data={loginData} handleFormChange={handleFormChange}></Form>
        </Modal>
      )}
    </div>
  );
};

export default LoginButton;
