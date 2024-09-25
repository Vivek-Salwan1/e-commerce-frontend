import React, { useContext, useState } from 'react'
import '../styles/shipping.css'
import axios from 'axios'
import { userContext } from '../App'
import { useNavigate } from 'react-router-dom'

function Shipping() {
    const navigate = useNavigate();
    const {user} = useContext(userContext)

    // const [fullname, setFullname] = useState('');
    // const [country, setCountry] = useState('');
    // const [state, setState] = useState('');
    // const [pincode, setPincode]=  useState('');
    // const [phone, setPhone] = useState('');
    // const [address, setAddress] = useState('');

    const [shippingDetails, setShippingDetails] = useState({
        fullname: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        phone: '',
        address: ''

    })

    console.log(shippingDetails)


    const handleShipping = () => {


        navigate('/order-summary', {
            state:{
                shippingDetails
            }
        })

    }



    return (
        <div className='shipping-page'>
            <h2>Shipping Address</h2>

            <div className="form">

                <div className="formPart1">


                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input type="name" name='name' onChange={e => setShippingDetails(prevState => ({  ...prevState,  fullname: e.target.value }))} />
                    </div>

                    <div>
                        <label htmlFor="name">Country</label>
                        <input type="name" name='country' onChange={e => setShippingDetails(prevState => ({...prevState,  country: e.target.value }))} />
                    </div>

                    <div>
                        <label htmlFor="name">State</label>
                        <input type="name" name='state' onChange={e => setShippingDetails(prevState => ({...prevState,  state: e.target.value }))} />
                    </div>

                    <div>
                        <label htmlFor="name">City</label>
                        <input type="name" name='city' onChange={e => setShippingDetails(prevState => ({...prevState,  city: e.target.value }))} />
                    </div>

                    <div>
                        <label htmlFor="name">Pin code</label>
                        <input type="name" name='pincode' onChange={e => setShippingDetails(prevState => ({...prevState,  pincode: e.target.value }))} />
                    </div>

                    <div>
                        <label htmlFor="name">Phone Numer</label>
                        <input type="name" name='phonenumber' onChange={e => setShippingDetails(prevState => ({...prevState,  phone: e.target.value }))} />
                    </div>

                </div>

                <div className="formPart2">
                    <label htmlFor="address">AddressLine/nearby</label>
                    <textarea name="address" id="" onChange={e => setShippingDetails(prevState => ({...prevState,  address: e.target.value }))} ></textarea>

                </div>

                <button type='submit' className='shipping-submit-btn' onClick={handleShipping}>Submit</button>

                <button style={{backgroundColor:'green'}}>Use Old Address</button>
            </div>

        </div>
    )
}

export default Shipping
