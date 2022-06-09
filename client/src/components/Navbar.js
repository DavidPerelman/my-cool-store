import { useState } from 'react';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import LogoutButton from './LogoutButton';
import CartButton from './CartButton';
import MyPopover from './Popover';
import './NavbarStyle.css';

const Navbar = ({ loggedIn, setLoggedIn, setRegisterSuccess }) => {
  const [active, setActive] = useState(true);

  return (
    <nav className='navbar'>
      <div className='brand-title'>MyCoolStore</div>
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
        {(loggedIn && (
          <>
            <input />
            <ul>
              <li>
                <a>
                  <MyPopover />
                </a>
              </li>
              <li>
                <a>
                  <LogoutButton setLoggedIn={setLoggedIn} />
                </a>
              </li>
            </ul>
          </>
        )) || (
          <>
            <input />
            <ul>
              <li>
                <a>
                  <MyPopover />
                </a>
              </li>
              <li>
                <a>
                  <RegisterButton setRegisterSuccess={setRegisterSuccess} />
                </a>
              </li>
              <li>
                <a>
                  <LoginButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
