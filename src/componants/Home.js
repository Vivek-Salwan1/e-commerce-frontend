import React from 'react'
import '../styles/home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home-page'>
      <h1>Welcome to E-Commerce Shopping Store</h1>
      <p>Register to Begin </p> <Link to='/register'> <button>Register/Login</button>  </Link>
    </div>
  )
}

export default Home
