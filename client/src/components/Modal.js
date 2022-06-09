import './ModalStyle.css';

const Modal = (props) => {
  return (
    <>
      <div className='modal' tabIndex='-1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{props.title}</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={props.onClose}
              ></button>
            </div>
            <div className='modal-body'>
              {(props.error && (
                <div className='alert alert-danger' role='alert'>
                  {props.error}
                </div>
              )) ||
                ''}
              {props.children}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                style={{ fontSize: '13px' }}
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={props.onClose}
              >
                Close
              </button>
              {!props.hideButton && (
                <button
                  type='button'
                  style={{ fontSize: '13px' }}
                  className='btn btn-primary'
                  onClick={props.onSubmit}
                >
                  {props.textButton}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
