import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RegisterButton from '../components/RegisterButton';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';

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
      <Navbar></Navbar>
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
          <Modal
            show={show}
            onClose={handleClose}
            hideButton={true}
            title={'Register Success!'}
          >
            <p>Register Success!</p>
            <p>
              For registration confirmation please click on the link that we
              sent to email you signed up with him.
            </p>
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
    </div>
  );
};

export default Home;
