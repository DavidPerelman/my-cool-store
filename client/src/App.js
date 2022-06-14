import Router from './Router';
import axios from 'axios';
import './App.css';
import { AuthContextProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';

axios.defaults.withCredentials = true;

function App() {
  return (
    <CartProvider>
      <AuthContextProvider>
        <div className='App'>
          <Router />
        </div>
      </AuthContextProvider>
    </CartProvider>
  );
}

export default App;
