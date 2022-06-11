import Router from './Router';
import axios from 'axios';
import './App.css';
import { AuthContextProvider } from './context/authContext';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Router />
      </div>
    </AuthContextProvider>
  );
}

export default App;
