import './ModalStyle.css';

const Modal = (props) => {
  // console.log(props);

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
            <div className='modal-body'>{props.children}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={props.onClose}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={props.onSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
