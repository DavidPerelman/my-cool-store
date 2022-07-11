import React from 'react';
import user from '../asset/user.png';
import MyPopover from '../components/MyPopover/MyPopover';
import RegisterContainer from './RegisterContainer';
import LoginConatiner from './LoginConatiner/LoginConatiner';
import LogoutConatiner from './LogoutConatiner';

const UserPopover = ({ setRegisterSuccess, loggedIn, userData }) => {
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
