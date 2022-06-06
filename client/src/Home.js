import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RegisterButton from './components/RegisterButton';
import RegisterSuccessModal from './components/RegisterSuccessModal';

const Home = () => {
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
      <RegisterButton />
      <RegisterSuccessModal
        show={show}
        onClose={handleClose}
        userName='David'
        // userName={userName}
      />
    </div>
  );
};

export default Home;
