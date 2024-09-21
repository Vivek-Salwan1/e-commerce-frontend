import React, { useContext, useEffect, useState } from 'react'
import '../styles/orderConfirmation.css'
import axios from 'axios'
import { userContext } from '../App'
import { Link, useLocation } from 'react-router-dom'
import { GiShoppingBag } from "react-icons/gi";

function OrderConfirmation() {
    const user = useContext(userContext)
    const location = useLocation();
    const { amountpaid, orderID, paymentID, paymentStatus, orderDate, name, phone, city, pincode } = location.state || {}; 

    console.log('id in corfirmation', orderID)

    const [items, setItems] = useState([]);

    useEffect(()=>{
      
        axios.get('http://localhost:3001/get-cart-items/'+user.email,)
        .then(resp => setItems(resp.data.cartItems))
        .catch(err => console.log(err))

    },[user])


    return (
        <div className='order-confirmation-page'>

            <h2>Your Order has been Confirmed !</h2>
            <h3>It will delivered soon</h3>

            <div className="confirmed-details">

                    <h4>Ordered Items</h4>
 

                <div className="confirm-boxes">
                    <table>
                        <tr>
                            <th>Product Img</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quntity</th>
                        </tr>
                        {
                            items && 
                            items.map((item, index)=>{
                                return(
                                    <tr>
                                    <td><img src={`http://localhost:3001/imgs/${item.image}`} alt="img"/></td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                                )
                            })
                        }

                    </table> <hr /> <br />
                    <h4>Order details and Shipping Address</h4>
                    <div className="orderid-address">
                        <li>Amount Paid : {amountpaid}</li>
                        <li>OrderID : {orderID}</li>
                        <li>PaymentID : {paymentID}</li>
                        <li>Payment Status : {paymentStatus}</li>
                        <li>Order Date : {orderDate}</li>
                        <li>Name : {name}</li>
                        <li>Phone : {phone}</li>
                        <li>City : {city}</li>
                        <li>Pincode : {pincode}</li>
                    </div>
                </div>


            </div>
            <div className="confirm-actions">
              <Link to='/products'><button className='shop-btn'> <GiShoppingBag/> Continue Shopping</button></Link>
               <Link to='/user-dashboard'> <button className='order-btn'>All Orders</button>  </Link>
            </div>

        </div>
    )   
}

export default OrderConfirmation
