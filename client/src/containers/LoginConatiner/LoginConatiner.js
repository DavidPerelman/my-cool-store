import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form';
import { isFormFieldsValid, isValidEmail } from '../../utils/formValidation';
import AuthService from '../../services/AuthServices';
import AuthContext from '../../context/authContext';
import './LoginConatiner.css';

const LoginConatiner = ({ redirect }) => {
  const { getLoggedIn, setLoginModalOpen } = useContext(AuthContext);

  const navigate = useNavigate();
  const [show, setShow] = useState(true);
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

  const handleClose = () => {
    clearFormFields();
    setLoginModalOpen(false);
    setShow(false);
  };

  const clearFormFields = () => {
    for (let field in loginData) {
      loginData[field] = '';
    }
  };

  const showError = (error) => {
    setError(error);

    const clearError = setTimeout(() => {
      setError('');
    }, 3000);
  };

  const login = async () => {
    console.log(redirect);

    if (!isFormFieldsValid(loginData)) return showError('all fields required!');

    if (!isValidEmail(loginData.email)) return showError('invalid email!');

    try {
      const response = await AuthService.login(loginData);
      console.log(console.log(response.response.data));
      if (response.response.data === 'login error!') {
        console.log(response.response.data);
        return showError(response.response.data);
      }
    } catch (err) {
      console.error(err);
    }

    setShow(false);
    await getLoggedIn();
    setLoginModalOpen(false);

    if (redirect) {
      navigate('/');
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginConatiner;
