import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../App'

function AllOrders() {
  const user = useContext(userContext)
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);



// console.log('orders',orders.orderedItems[0].title)
  useEffect(() => {

    axios.get('http://localhost:3001/get-all-orders')
      .then(orders => {
        if (orders) {
          console.log('orders',orders)
          setOrders(orders.data)
        }
      })
      .catch(err => console.log(err))
  }, [user])

  useEffect(()=>{

    const totalNoOfOrders = orders.length;
    setTotalOrders(totalNoOfOrders);

  },[orders])


  return (
    <div className='order-summary-page all-orders-page'>

      <h2>Total Orders : {totalOrders} </h2>


    {
      orders &&  orders.map((order, index)=>{

        return(
          <>
        <h4 style={{textAlign:'center'}}>Order</h4>
          <div className="summary">
 
          <table>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Qun</th>
              {/* <th>Qun (-)</th>
              <th>Qun (+)</th>
              <th>Remove</th> */}
            </tr>
  
            {
              order.orderedItems && order.orderedItems.map((item, index)=>{
                return(
                  <tr>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
                 

                )
              })
            }
         
  
          </table>
  
          <div className="shipping-address">
            <li>OrderID:{order.orderID}</li>
            <li>AmountPaid:{order.amountPaid}</li>
            <li>PaymentStatus:{order.paymentStatus}</li>
            <li>OrderDate: {order.orderDate} </li>
            <li>Name:{order.fullname}</li>
            <li>Phone:{order.phone} </li>
            <li>Country: {order.country}</li>
            <li>State: {order.country} </li>
            <li>City: {order.city} </li>
            <li>Pincode:{order.pincode} </li>
            <li>Address: {order.address} </li>
  
          </div>
  
  
  
        </div>
        <hr />
        </>

        )
      })

    }
  
    </div>
  )
}


export default AllOrders
