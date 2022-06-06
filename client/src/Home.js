import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RegisterButton from './components/RegisterButton';
import RegisterSuccessModal from './components/RegisterSuccessModal';

const Home = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { status } = useParams();
  console.log(status);

  return (
    <div>
      <h1>MyCoolStore</h1>
      <RegisterButton />
      <RegisterSuccessModal show={show} onClose={handleClose} />
    </div>
  );
};

export default Home;
