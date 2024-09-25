import './styles/App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
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
import Loader from './componants/Loader';
// import ClipLoader from 'react-spinners/ClipLoader';


export const userContext = createContext();
function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  // const location = useLocation();

  useEffect(() => {

    axios.defaults.withCredentials = true
    axios.get('https://e-commerce-backend-production-b06c.up.railway.app/')
      .then(resp => setUser(resp.data))
      .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setLoading(true); // Show loader on request start
      return config;
    }, (error) => {
      setLoading(false); // Hide loader if request fails
      return Promise.reject(error);
    });
  
    // Add a response interceptor
    const responseInterceptor = axios.interceptors.response.use((response) => {
      setLoading(false); // Hide loader on successful response
      return response;
    }, (error) => {
      setLoading(false); // Hide loader if response fails
      return Promise.reject(error);
    });
  
    // Clean up the interceptors on component unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  

  console.log('user', user)
  if (!user) return <div><p> loading </p> </div> 
  return (

    <userContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
     
        <div className="app-container">
          <Navbar />
          <Loader show={loading} />
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
              <Route path='/all-orders' element={<AllOrders />}></Route>
            </Routes>
          </div>

          {/* Footer will be at the bottom */}
          
             {/* {window.location.pathname !== '/' && <Footer />} */}
             <Footer/>
          
      
        </div>
      </BrowserRouter>
    </userContext.Provider>

  );
}

export default App;
