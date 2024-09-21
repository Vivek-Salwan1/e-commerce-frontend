import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ack, setAck] = useState('');

  const handleLogin = (e)=>{
    e.preventDefault()

    axios.defaults.withCredentials = true
    axios.post('http://localhost:3001/login', {email,password})
    .then(resp => {
      if(resp.data == 'logged in'){
        navigate('/products')
        
        window.location.reload()

      }else{
        setAck(resp.data)
      }
    })
    .catch(err => console.log(err))
  }



  return (
    <>
    <div className="register-page">


      <form onSubmit={handleLogin} className='register'>
        <h2>Login</h2>
        <label htmlFor="name" >Email :</label>
        <input type="text" name='email' onChange={e => setEmail(e.target.value)} required />

        <label htmlFor="name" >Password :</label>
        <input type="text" name='password' onChange={e => setPassword(e.target.value)} required/>
        <p>{ack}</p>
        <button type='submit'>Login</button>
      </form>
     
    </div>
 
    </>
  )
}

export default Login
