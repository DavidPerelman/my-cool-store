import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthServices';
import AuthContext from '../context/authContext';
import Button from '../components/Button/Button';

const LogoutConatiner = () => {
  const { getLoggedIn, show, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await AuthService.logout();
      await getLoggedIn();
      navigate('/');
    } catch (err) {
      console.log(err);
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
  }, []);

  return (
    <Button size='user-buttons' className='btn btn-primary' onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutConatiner;
