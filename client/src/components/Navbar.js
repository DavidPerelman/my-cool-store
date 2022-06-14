import { useState, useEffect } from 'react';
import CartPopover from './CartPopover';
import UserPopover from './UserPopover';
import ClockDate from './ClockDate';
import './NavbarStyle.css';

const Navbar = ({ loggedIn, userData, guestData, setRegisterSuccess }) => {
  const [active, setActive] = useState(true);

  const today = new Date();
  const date =
    today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;

  return (
    <nav className='navbar'>
      <div className='date-brand-div'>
        <div className='brand-title'>MyCoolStore</div>
        <ClockDate />
      </div>
      <a
        href='#'
        className='toggle-button'
        onClick={() => {
          setActive(!active);
        }}
      >
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </a>
      <div className={active ? 'navbar-links active' : 'navbar-links'}>
        <div className='navbar-input-div'>
          <input className='navbar-input' />
        </div>
        {(loggedIn && (
          <>
            <p className='greet-user'>Hello {userData.firstName}</p>
            <ul>
              <li className='wrapper'>
                <a>
                  <CartPopover loggedIn={loggedIn} userData={userData} />
                </a>
              </li>
              <li className='wrapper-user'>
                <a className='link-hover'>
                  <UserPopover
                    userData={userData}
                    setRegisterSuccess={setRegisterSuccess}
                    loggedIn={loggedIn}
                  />
                </a>
              </li>
            </ul>
          </>
        )) || (
          <>
            <ul>
              <p className='greet-user'>Hello Guest</p>
              <li className='wrapper'>
                <a>
                  <CartPopover loggedIn={loggedIn} userData={userData} />
                </a>
              </li>
              <li className='wrapper-user'>
                <a>
                  <UserPopover
                    userData={userData}
                    setRegisterSuccess={setRegisterSuccess}
                    loggedIn={loggedIn}
                  />
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
