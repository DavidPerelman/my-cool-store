import React, { useState, useContext } from 'react';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Form from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { isFormFieldsValid, isValidEmail } from '../../utils/formValidation';
import AuthService from '../../services/AuthServices';
import AuthContext from '../../context/authContext';
import AdminServices from '../../services/AdminServices';

const Login = () => {
  const { getIsAdminlsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
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

  const login = async () => {
    if (!isFormFieldsValid(loginData)) return showError('all fields required!');

    if (!isValidEmail(loginData.email)) return showError('invalid email!');

    try {
      const response = await AdminServices.login(loginData);
      console.log(response.isAdmin);
      await getIsAdminlsLoggedIn();

      if (response === 'login error!') {
        return showError(response);
      }
      if (response === `You don't have permission!`) {
        return showError(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showError = (error) => {
    setError(error);

    const clearError = setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <div>
      <Container>
        {(error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )) ||
          ''}
        <Form data={loginData} handleFormChange={handleFormChange}></Form>
        <div className='modal-footer'>
          <Button size='user-modal-button' onClick={login}>
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Login;
