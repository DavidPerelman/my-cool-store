import { useState } from 'react';
import './NavbarStyle.css';

const Navbar = () => {
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
        <ul>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
            <a href='#'>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
