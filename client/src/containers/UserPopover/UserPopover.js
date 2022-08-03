import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import user from '../../asset/user.png';
import MyPopover from '../../components/MyPopover/MyPopover';
import LogoutConatiner from './../LogoutConatiner';
import Button from '../../components/Button/Button';
import AuthContext from '../../context/authContext';
import Popover from '../../components/Popover/Popover';
import './UserPopover.css';

const UserPopover = ({ isAdminlLoggedIn, loggedIn, userData, logout }) => {
  const navigate = useNavigate();
  const { setLoginModalOpen, setRegisterModalOpen } = useContext(AuthContext);

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

  const login = () => {
    document.getElementsByClassName('user-content')[0].style.visibility =
      'hidden';
    setLoginModalOpen(true);
  };

  const register = () => {
    document.getElementsByClassName('user-content')[0].style.visibility =
      'hidden';
    setRegisterModalOpen(true);
  };

  return (
    <>
      <Popover keyValue='user' icon={user}>
        <div className={`user-content`}>
          <div className='title'>
            <h5>{userData === null ? 'Guest' : userData.firstName}</h5>
          </div>
          <div className='popover-body'>
            {(loggedIn && (
              <>
                <ul className='user-popover-ul'>
                  <li className='user-popover-li'>
                    <Button size='user-buttons' onClick={goToMyOrders}>
                      My Orders
                    </Button>
                  </li>
                  <li className={`user-popover-li`}>
                    <LogoutConatiner loggedIn={loggedIn} />
                  </li>
                </ul>
              </>
            )) || (
              <>
                <ul className='user-popover-ul'>
                  <li className='user-popover-li'>
                    <Button size='user-buttons' onClick={register}>
                      Register
                    </Button>
                  </li>
                  <li className={`user-popover-li`}>
                    <Button size='user-buttons' onClick={login}>
                      Login
                    </Button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </Popover>
      {/* <MyPopover
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
            <Button size='user-buttons' onClick={register}>
              Register
            </Button>
            <Button size='user-buttons' onClick={login}>
              Login
            </Button>
          </>
        )}
      </MyPopover> */}
    </>
  );
};

export default UserPopover;
