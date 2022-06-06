import { useState } from 'react';
import RegisterModal from './components/RegisterModal';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

function App() {
  const [show, setShow] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setRegistered(false);
  };

  return (
    <div className='App'>
      <h1>MyCoolStore</h1>
      <button type='button' className='btn btn-primary' onClick={handleShow}>
        Primary
      </button>
      <RegisterModal
        registered={registered}
        setRegistered={setRegistered}
        show={show}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
