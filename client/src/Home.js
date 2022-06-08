import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RegisterButton from './components/RegisterButton';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import RegisterSuccessModal from './components/RegisterSuccessModal';
import Modal from './components/Modal';

const Home = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerConfirmation, setRegisterConfirmation] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { status, userName } = useParams();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    navigate('/');
    setRegisterConfirmation(false);
    setRegisterSuccess(false);
    setShow(false);
  };

  useEffect(() => {
    console.log(status);
    console.log(userName);
    console.log(loggedIn);

    if (status === 'registerSuccess') {
      setShow(true);
      setRegisterConfirmation(true);
    } else {
      setShow(false);
      setRegisterConfirmation(false);
    }
  }, []);

  return (
    <div>
      <h1>MyCoolStore</h1>
      {(loggedIn && (
        <>
          <p>Hello!</p> <LogoutButton setLoggedIn={setLoggedIn} />
        </>
      )) || (
        <>
          <RegisterButton setRegisterSuccess={setRegisterSuccess} />
          <br />
          <LoginButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </>
      )}

      {registerSuccess && (
        <>
          <Modal show={show} onClose={handleClose} hideButton={true}>
            Register Success!
          </Modal>
        </>
      )}

      {registerConfirmation && (
        <>
          <Modal
            show={show}
            onClose={handleClose}
            hideButton={true}
            userName={userName}
            title={'Register Confirmation'}
          >
            <p>Thank you {userName} for subscribing to our site!</p>
          </Modal>
        </>
      )}

      {/* <RegisterSuccessModal
        show={show}
        onClose={handleClose}
        userName={userName}
      /> */}
    </div>
  );
};

export default Home;
