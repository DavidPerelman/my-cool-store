import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RegisterButton from './components/RegisterButton';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import RegisterSuccessModal from './components/RegisterSuccessModal';

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { status, userName } = useParams();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    console.log(status);
    console.log(userName);

    if (status === 'registerSuccess') {
      setShow(true);
    } else {
      setShow(false);
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
          <RegisterButton />
          <br />
          <LoginButton />
        </>
      )}

      <RegisterSuccessModal
        show={show}
        onClose={handleClose}
        userName={userName}
      />
    </div>
  );
};

export default Home;
