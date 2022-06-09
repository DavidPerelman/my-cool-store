import { useState } from 'react';
import Popover from './Popover';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import LogoutButton from './LogoutButton';
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
            <ul>
              <li>
                <LogoutButton setLoggedIn={setLoggedIn} />
              </li>
            </ul>
            {/* <p>Hello!</p> <LogoutButton setLoggedIn={setLoggedIn} /> */}
          </>
        )) || (
          <>
            <ul>
              <li>
                <RegisterButton setRegisterSuccess={setRegisterSuccess} />
              </li>
              <li>
                <LoginButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </li>
            </ul>
          </>
        )}
        {/* <ul>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
            <a href='#'>Contact</a>
          </li>
          <li>
            <a href='#'>
              <Popover></Popover>
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
