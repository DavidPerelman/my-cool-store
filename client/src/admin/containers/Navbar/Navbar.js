import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ClockDate from '../../../components/ClockDate';
import UserPopover from '../../../containers/UserPopover';
import AuthContext from '../../../context/authContext';
import Logout from '../../asset/logout.png';
// import NavbarInput from '../../containers/NavbarInput/NavbarInput';
import './Navbar.css';

const Navbar = ({ logout }) => {
  const { isAdminLoggedIn, adminData } = useContext(AuthContext);
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
        <div
          className='user-navbar-controllers'
          // style={{ marginLeft: 'auto', display: 'flex' }}
        >
          <p className='greet-user' style={{ marginTop: '8px' }}>
            Hello {adminData === null ? 'Guest' : adminData.firstName}
          </p>
          <ul>
            <li className='wrapper-user' style={{ marginRight: '5px' }}>
              <a className='link-hover'>
                {isAdminLoggedIn && (
                  <span onClick={logout}>
                    <img src={Logout} alt='Logout' style={{ width: '30px' }} />
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
