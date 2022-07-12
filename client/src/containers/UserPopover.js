import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import user from '../asset/user.png';
import MyPopover from '../components/MyPopover/MyPopover';
import RegisterContainer from './RegisterContainer';
import LoginConatiner from './LoginConatiner/LoginConatiner';
import LogoutConatiner from './LogoutConatiner';
import MyOrders from '../pages/MyOrders/MyOrders';
import Button from '../components/Button/Button';

const UserPopover = ({ setRegisterSuccess, loggedIn, userData }) => {
  const navigate = useNavigate();

  const goToMyOrders = () => {
    const userContentPopover = (document.getElementsByClassName(
      'user-content'
    )[0].style.visibility = 'hidden');
    navigate(`/orders/${userData._id}`);
  };

  useEffect(() => {
    const userWrapper = document.getElementsByClassName('wrapper-user')[0];
    const userContent = document.getElementsByClassName('user-content')[0];

    userWrapper.addEventListener('mouseover', () => {
      userContent.style.visibility = 'visible';
    });

    userWrapper.addEventListener('mouseout', () => {
      userContent.style.visibility = 'hidden';
    });
  }, [100]);

  return (
    <MyPopover
      type='user'
      icon={user}
      title={loggedIn ? userData.firstName : 'Guest'}
      userData={userData}
      loggedIn={loggedIn}
    >
      {(loggedIn && (
        <>
          <Button size='user-buttons' onClick={goToMyOrders}>
            My Orders
          </Button>
          <LogoutConatiner loggedIn={loggedIn} />
        </>
      )) || (
        <>
          <RegisterContainer
            loggedIn={loggedIn}
            setRegisterSuccess={setRegisterSuccess}
          ></RegisterContainer>
          <LoginConatiner
            setRegisterSuccess={setRegisterSuccess}
            loggedIn={loggedIn}
          ></LoginConatiner>
        </>
      )}
    </MyPopover>
  );
};

export default UserPopover;
