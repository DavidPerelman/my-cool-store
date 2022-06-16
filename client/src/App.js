import Router from './Router';
import axios from 'axios';
import './App.css';
import { AuthContextProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import { ProductsContextProvider } from './context/productsContext';

axios.defaults.withCredentials = true;

function App() {
  return (
    <ProductsContextProvider>
      <CartProvider>
        <AuthContextProvider>
          <div className='App'>
            <Router />
          </div>
        </AuthContextProvider>
      </CartProvider>
    </ProductsContextProvider>
  );
}

export default App;
