import { useParams } from 'react-router-dom';
import RegisterButton from './components/RegisterButton';
import Router from './Router';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

function App() {
  const { param } = useParams();
  console.log(param);

  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
