import React, { useContext, useEffect, useState } from 'react'
import '../styles/userDashboard.css'
import { userContext } from '../App'
import axios from 'axios'
import userImg from '../imgs/welcome-user.jpeg'

function UserDashboard() {
    const {user} = useContext(userContext)
    const [orders, setOrders] = useState([])
    const [totalOrders, setTotalOrders] = useState(Number)

    let noOrders;

    useEffect(() => {

        axios.get('https://e-commerce-backend-production-b06c.up.railway.app/get-user-orders/' + user.email)
            .then(orders => {
                if (orders) {
                    setOrders(orders.data)
                } else {
                    noOrders = 'No Orders Yet'
                }
            })
            .catch(err => console.log(err))

    }, [user])


    useEffect(() => {

        const totalOrders = orders.length;
        setTotalOrders(totalOrders)

    }, [orders])

    // console.log('orders', orders)
    return (
        <div className='user-dashboard-page'>

            <div className="user-section">
                <div className="user-part1">
                    <img src={userImg} alt="" srcset="" />
                </div>
                <div className="user-part2">
                    <h2 className='username'>Welcome, {user.name}</h2>
                    <h3>{user.email} </h3>
                    <h2>Total Orders: {totalOrders} </h2>
                </div>
            </div>




            {
                orders.map((item, index) => {

                    return (
                        <div className="user-orders">

                            <div className="user-order-items">
                                <h4>Ordered Items</h4>

                                <table>
                                    <tr>
                                        <th>Product img</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                    {
                                        item.orderedItems && item.orderedItems.map((product, index) => {
                                            return (
                                                <tr>
                                                    <td><img src={`https://e-commerce-backend-production-b06c.up.railway.app/imgs/${product.image}`} alt="" srcset="" /></td>
                                                    <td>{product.title}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                </tr>

                                            )
                                        })
                                    }

                                </table>
                            </div>
                            <div className="user-payment-details">

                                <h4>PaymentDetails and ShippingAddress</h4>

                                <li><b>OrderID :</b> {item.orderID}</li>
                                <li><b>Amount Paid:</b> {item.amountPaid} rupees </li>
                                <li><b>PaymentID :</b> {item.paymentID} </li>
                                <li><b>Order date :</b> {item.orderDate}</li>
                                <li><b>Name :</b> {item.fullname}</li>
                                <li><b>Phone:</b> {item.fullname}</li>
                                <li><b>Country:</b> {item.country}</li>
                                <li><b>State:</b> {item.state}</li>
                                <li><b>City:</b> {item.city}</li>
                                <li><b>Pincode:</b> {item.pincode}</li>
                                <li><b>Shipping Address:</b> {item.address}</li>

                            </div>

                        </div>
                    )

                })
            }


        </div>
    )
}

export default UserDashboard
