import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthService from '../services/AuthServices';
import AuthContext from '../context/authContext';
import NewButton from '../components/NewButton/NewButton';

const LogoutButton = () => {
  const { getLoggedIn, show, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await AuthService.logout();
      await getLoggedIn();
      // navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

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
    <Button
      type='button'
      style={buttonStyle}
      className='btn btn-primary'
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
