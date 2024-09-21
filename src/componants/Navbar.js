import React, { useContext } from 'react'
import '../styles/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import axios from 'axios'
import { CiUser } from "react-icons/ci";

function Navbar() {
  const user = useContext(userContext)
  const navigate = useNavigate()


  const handleLogout = () => {

    axios.defaults.withCredentials = true
    axios.post('https://e-commerce-backend-5blo.onrender.com/logout')
      .then(resp => {
        if (resp.data == 'logged out') {
          console.log('logged out')
          navigate('/')
        }
      })
      .catch(err => console.log(err))
  }


  return (
    <div className='nav'>
      <ul>
        <Link to='/'> <li className='logo'>E-Commerce</li> </Link>
      </ul>

      {/* <ul>
        <li> <input type="text" placeholder='Search Products' />     </li>
      </ul> */}

      <ul>




        {
          user && user.name == 'admin' ?

            <ul>
              <li style={{cursor:'default', textDecoration:'none', color:'#007bff'}}> <span> Welcome, {user.name}</span></li>
             <Link to='/products'> <li>Go To Home</li> </Link>
             <Link to='/add-product'><li>Add Product</li></Link> 
              <Link to='/all-orders'> <li>All Orders</li> </Link>
              <Link to='/registered-users'><li>All Users</li> </Link> 
              <li onClick={handleLogout}><button> <CiUser/><span className="logout-text">Logout</span></button> </li>

            </ul>

            : user.name ?

              <ul>

                <li style={{cursor:'default', textDecoration:'none', color:'#007bff'}}> <span> Welcome, {user.name}</span></li>

               <Link to='/products'>  <li>Products</li> </Link>
               <Link to='/cart'>  <li>Cart</li> </Link>
                <Link to='/user-dashboard'> <li>Dashboard</li> </Link>
                <li  onClick={handleLogout}><button> <CiUser/><span className="logout-text">Logout</span></button> </li>

              </ul>
              :
              <li>
                <Link to='/register'> <button style={{backgroundColor:'#1A73E8', color:'#FFFF'}}>Register/Login</button>  </Link>
              </li>
        }


      </ul>

    </div>
  )
}

export default Navbar
