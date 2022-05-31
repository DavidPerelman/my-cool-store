import { useState } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <div className='App'>
      <h1>MyCoolStore</h1>
      <button type='button' className='btn btn-primary' onClick={handleShow}>
        Primary
      </button>
    </div>
  );
}

export default App;
