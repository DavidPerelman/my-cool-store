import './PopoverStyle.css';
import cart from '../asset/cart.png';

const MyPopover = () => {
  return (
    <>
      <div className='wrapper'>
        <img className='logo' src={cart} alt='Logo' />
        <div className='content'>
          <div className='title'>
            <h5>Popover</h5>
          </div>
          <div className='popover-body'>
            <ul className='popover-ul'>
              <li>Point 1</li>
              <li>Point 2</li>
              <li>Point 3</li>
              <li>Point 4</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPopover;
