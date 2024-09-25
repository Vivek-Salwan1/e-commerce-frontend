import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
       
        axios.post('https://e-commerce-backend-production-b06c.up.railway.app/register-user', {name,email,phone,password})
        .then(resp => {
            if(resp.data.massage == 'user-exist'){
                console.log('User already exists')
            }else{
          console.log('account created successfully')
            navigate('/login')
            }
        })
        .catch(err => console.log(err))

    }

    return (
        <div className="register-page">


            <form onSubmit={handleRegister} className='register'>
                <h2>Create new Account</h2>

                <label htmlFor="name" >Name :</label>
                <input type="text" name='name' onChange={e => setName(e.target.value)} />

                <label htmlFor="name" >Email :</label>
                <input type="text" name='email' onChange={e => setEmail(e.target.value)} />

                <label htmlFor="name" >Phone No :</label>
                <input type="text" name='phone' onChange={e => setPhone(e.target.value)} />

                <label htmlFor="name" >Password :</label>
                <input type="text" name='password' onChange={e => setPassword(e.target.value)} />

                <button type='submit'>Register</button>
                <p>Already have Account</p>
                <Link to='/login'> <button>Login</button> </Link>
            </form>

        </div>
    )
}

export default Register
