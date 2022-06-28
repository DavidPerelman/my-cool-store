import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content/Content';
import Modal from '../components/Modal/Modal';

const Home = ({ loggedIn, userData }) => {
  const navigate = useNavigate();
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
    // addCartItem();
    if (status === 'registerSuccess') {
      setShow(true);
      setRegisterConfirmation(true);
    } else {
      setShow(false);
      setRegisterConfirmation(false);
    }
  }, []);

  return (
    <>
      <div>
        <Content></Content>
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
    </>
  );
};

export default Home;
