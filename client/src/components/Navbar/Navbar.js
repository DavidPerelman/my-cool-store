import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartPopover from '../../containers/CartPopover';
import NavbarInput from '../../containers/NavbarInput/NavbarInput';
import UserPopover from '../../containers/UserPopover';
import AuthContext from '../../context/authContext';
import ClockDate from '../ClockDate';
import './Navbar.css';

const Navbar = ({ setRegisterSuccess }) => {
  const { loggedIn, userData } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  const navigate = useNavigate();
  const [active, setActive] = useState(true);

  const brandTitleClick = () => {
    navigate('/');
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
        <NavbarInput />
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <p className='greet-user'>
            Hello {userData === null ? 'Guest' : userData.firstName}
          </p>
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
        </div>
        {/* {loggedIn === true && (
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
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
          </div>
        )}
        {loggedIn === false && (
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
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
          </div>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
