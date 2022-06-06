import { useParams } from 'react-router-dom';
import RegisterButton from './components/RegisterButton';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

function App() {
  const { param } = useParams();
  console.log(param);

  return (
    <div className='App'>
      <h1>MyCoolStore</h1>
      <RegisterButton />
    </div>
  );
}

export default App;
