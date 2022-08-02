import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ClockDate from '../../../components/ClockDate';
import UserPopover from '../../../containers/UserPopover';
import AuthContext from '../../../context/authContext';
// import NavbarInput from '../../containers/NavbarInput/NavbarInput';
import './Navbar.css';

const Navbar = () => {
  const { isAdminlLoggedIn, userData, logout } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  const navigate = useNavigate();
  const [active, setActive] = useState(true);

  const brandTitleClick = () => {
    navigate('/admin');
  };

  return (
    <nav className='navbar'>
      <div className='date-brand-div'>
        {/* <Button className='brand-title'>MyCoolStore</Button> */}
        <div className='brand-title' onClick={brandTitleClick}>
          MyCoolStore
        </div>
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
        {/* <NavbarInput /> */}
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <p className='greet-user'>
            Hello {userData === null ? 'Guest' : userData.firstName}
          </p>
          <ul>
            {/* <li className='wrapper'>
              <a></a>
            </li> */}
            <li className='wrapper-user'>
              <a className='link-hover'>
                <Button onClick={logout}>Logout</Button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
