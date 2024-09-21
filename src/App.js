import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './componants/Home'
import Navbar from './componants/Navbar';
import Register from './componants/Register';
import Login from './componants/Login';
import Products from './componants/Products';
import ProductDetails from './componants/ProductDetails';
import Cart from './componants/Cart';
import Shipping from './componants/Shipping';
import OrderSummary from './componants/OrderSummary';
import OrderConfirmation from './componants/OrderConfirmation';
import UserDashboard from './componants/UserDashboard';
import EditProduct from './componants/EditProduct';
import RegisteredUsers from './componants/RegisteredUsers';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AddProduct from './componants/AddProduct';
import AllOrders from './componants/AllOrders';
import Footer from './componants/Footer';

export const userContext = createContext();
function App() {


  const [user, setUser] = useState(null)

  useEffect(() => {

    axios.defaults.withCredentials = true
    axios.get('http://localhost:3001/')
      .then(resp => setUser(resp.data))
      .catch(err => console.log(err))

  }, [])

  if (!user) return <p>Loading...</p>
  return (
    
    <userContext.Provider value={user}>
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
  
        {/* This content area will take up the remaining space */}
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/product-details/:productID' element={<ProductDetails />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/shipping' element={<Shipping />}></Route>
            <Route path='/order-summary' element={<OrderSummary />}></Route>
            <Route path='/order-confirmation' element={<OrderConfirmation />}></Route>
            <Route path='/user-dashboard' element={<UserDashboard />}></Route>
            <Route path='/edit-product/:productID' element={<EditProduct />}></Route>
            <Route path='/registered-users' element={<RegisteredUsers />}></Route>
            <Route path='/add-product' element={<AddProduct />}></Route>
            <Route path='/all-orders' element={<AllOrders/>}></Route>
          </Routes>
        </div>
  
        {/* Footer will be at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  </userContext.Provider>
  
  );
}

export default App;
