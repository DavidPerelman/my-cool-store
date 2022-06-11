import { useState } from 'react';
import CartPopover from './CartPopover';
import UserPopover from './UserPopover';
import './NavbarStyle.css';

const Navbar = ({ loggedIn, setRegisterSuccess }) => {
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
            <input className='navbar-input' />
            <ul>
              <li className='wrapper'>
                <a>
                  <CartPopover />
                </a>
              </li>
              <li className='wrapper'>
                <a className='link-hover'>
                  <UserPopover
                    setRegisterSuccess={setRegisterSuccess}
                    loggedIn={loggedIn}
                  />
                </a>
              </li>
            </ul>
          </>
        )) || (
          <>
            <input className='navbar-input' />
            <ul>
              <li className='wrapper'>
                <a>
                  <CartPopover />
                </a>
              </li>
              <li className='wrapper'>
                <a>
                  <UserPopover
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
