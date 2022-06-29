import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import Form from '../components/Form';
import { isLoginFormFieldsValid, isValidEmail } from '../utils/formValidation';
import AuthService from '../services/AuthServices';
import AuthContext from '../context/authContext';
import './LoginButton.css';
import '../components/Button/Button.css';
const LoginButton = () => {
  const { getLoggedIn, loggedIn } = useContext(AuthContext);

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
    if (isLoginFormFieldsValid(loginData.email, loginData.password))
      return setError('all fields required!');
    if (!isValidEmail(loginData.email)) return setError('invalid email!');

    try {
      const response = await AuthService.login(loginData);
      if (response.response.data.errMessage === 'login error!') {
        setError(response.response.data.errMessage);
        // clearError();
        const clearError = setTimeout(clearErrorMessage, 3000);
        function clearErrorMessage() {
          setError('');
        }
        return;
      }
    } catch (err) {
      console.log(err);
    }

    setShow(false);
    await getLoggedIn();
    navigate('/');

    const clearError = setTimeout(clearErrorMessage, 3000);
    function clearErrorMessage() {
      setError('');
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      setTimeout(() => {
        if (show) {
          document
            .getElementsByClassName('user-popover')[0]
            .lastChild.classList.add('keep-show-modal');
        }
        if (!show) {
          document
            .getElementsByClassName('user-popover')[0]
            .lastChild.classList.remove('keep-show-modal');
        }
      }, 100);
    }
  }, [show]);

  return (
    <div>
      <Button
        type='button'
        size='user-popover-button'
        color='button--primary'
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
