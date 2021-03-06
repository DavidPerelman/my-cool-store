import './Modal.css';

const Modal = ({ title, onClose, error, children }) => {
  return (
    <>
      <div className='modal' tabIndex='-1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{title}</h5>
              <button
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={onClose}
              ></button>
            </div>
            <div className='modal-body'>
              {(error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )) ||
                ''}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
