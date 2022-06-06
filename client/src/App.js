import Router from './Router';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
