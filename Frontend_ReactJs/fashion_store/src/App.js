import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/loginPage/loginPage';
import SignUpPage from './components/signUpPage/signUp';
import ResetPasswordForm from './components/resetPassword/resetPassword';
import ForgotPasswordForm from './components/forgotPassword/forgotPassword';
import Home from './components/HomePage/Home';
import HomeProductsUpload from './components/HomePageProductUpload/HomeUpload';
import MensFashion from './components/MensFashion/mensFashion';
import MensUpload from './components/MensFashion/mensUpload';
import Cart from './components/Checkout/Checkout';
import CheckoutForm from './components/PaymentPage/payment';
import { CartProvider } from './components/CartContext/cartContext';
import PaymentComponent from './components/PaymentPage/payment';
import AddressForm from './components/AddressForm/addressForm';
import SearchResults from './components/showSearchResult/searchResult';
import Protectedroute from './components/protectedRoute/protectedRoute';

function App() {
  const [cart, setCart] = useState([]);
  return (
   <>
     <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/reset-password/:token' element={<ResetPasswordForm/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordForm/>}/>
      <Route path='/home' element={<Protectedroute Component={Home}/>}/>
      <Route path='/product-upload' element={<HomeProductsUpload/>}/>
      <Route path='/mens-fashion' element={<MensFashion/>}/>
      <Route path='/mens-upload' element={<MensUpload/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment' element={<PaymentComponent/>} />
      <Route path='/address' element={<AddressForm/>}/>
      <Route path="/search/:query" element={<SearchResults />} />
   
    </Routes>
    </BrowserRouter>
    </CartProvider>
   </>
  );
}

export default App;
