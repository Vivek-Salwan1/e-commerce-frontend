import React, { useContext, useEffect, useState } from 'react'
import '../styles/orderSummary.css'
import axios from 'axios'
import { userContext } from '../App'
import { useLocation, useNavigate } from 'react-router-dom';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { SiRazorpay } from "react-icons/si";


function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(userContext)

  const [orderedItems, setOrderedItems] = useState([]);
  const [totalPrice, setTotal] = useState(Number)


  const {shippingDetails} = location.state || {}
  // console.log('shipping', shippingDetails)
  useEffect(() => {

    axios.get('http://localhost:3001/get-cart-items/'+user.email)
      .then(resp => {
        if(resp.data.cartItems){
          setOrderedItems(resp.data.cartItems)
        }
       
      })
      .catch(err => console.log(err))

  }, [])

  useEffect(()=>{
    const total = orderedItems.reduce((accumulator, item) => { return accumulator + item.price;}, 0);
    setTotal(total)
  },[orderedItems])


  // console.log(shippingDetails)
  // console.log(orderedItems)

  
  const handlePayment = (e) => {
    axios.post('http://localhost:3001/payment', { 
        amount: totalPrice * 100, // Converting INR to paise (required by Razorpay)
        currency: 'INR', 
        receipt: 'ksjfjh', 
        shippingDetails, 
        userEmail: user.email 
      })
      .then(resp => {
        const { id, amount, currency } = resp.data; // Extract Razorpay order ID
  
        const options = {
          key: 'rzp_test_WWZE0bebaftNDP', // Replace with your Razorpay key_id
          amount: amount, // Already in paise from backend
          currency: currency, // Use currency from backend response
          name: 'e-commerce',
          description: 'Test Transaction',
          order_id: id, // Use dynamic order_id from backend response
          prefill: {
            name: shippingDetails.fullname || 'vivek',
            email: 'vivek@gmail.com', // Use actual email if available
            contact: shippingDetails.phone || '9059854833' // Use actual phone number
          },
          theme: {
            color: '#F37254'
          },
          handler: function (response) {
            const { razorpay_payment_id } = response;
          
  
            // Send payment details to the backend for saving order
            axios.post('http://localhost:3001/save-order-details', {
              orderID: id,
              amountPaid:totalPrice,
              paymentID: razorpay_payment_id,
              paymentStatus: 'Success',
              shippingDetails,
              userEmail: user.email
            })
            .then(() => {
              // Navigate to the order confirmation page
              navigate('/order-confirmation', {
                state: {
                  amountpaid:totalPrice,
                  orderID: id,
                  paymentID: razorpay_payment_id,
                  paymentStatus: 'Success',
                  orderDate: new Date().toLocaleString(),
                  name: shippingDetails.fullname,
                  phone: shippingDetails.phone,
                  city: shippingDetails.city,
                  pincode: shippingDetails.pincode
                }
              });
            })
            .catch(err => console.log(err));
          }
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch(err => console.log(err));
  };

  
  const handleQuantityChange = (itemID, action) => {
    const updatedCart = orderedItems.map(item => {
        if (item._id === itemID) {
            if (action === 'increase') {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                    price: item.basePrice * (item.quantity + 1), // Ensure basePrice is stored for accurate pricing
                };
            } else if (action === 'decrease' && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                    price: item.basePrice * (item.quantity - 1),
                };
            }
        }
        return item;
    });

    setOrderedItems(updatedCart);

    // Optionally, send updated data to the server
    axios.put('http://localhost:3001/update-cart', {
        userEmail: user.email,
        updatedCart,
    }).then(resp => console.log('Cart updated'))
        .catch(err => console.log(err));
};




const handleRemoveFromCart = (itemID) => {

  axios.delete('http://localhost:3001/remove-from-cart/', {
      params: {
          itemID: itemID,
          userEmail: user.email
      }
  }).then(resp => {
      if (resp.data == 'item-removed') {
          const updatedCart = orderedItems.filter(item => item._id !== itemID)

          setOrderedItems(updatedCart)
      }
  })
      .catch(err => console.log(err))
}


  return (
    <div className='order-summary-page'>

      <h2>Order Summary</h2>
     

      <div className="summary">

        <table>
          <tr>
            <th>Product Img</th>
            <th>Title</th>
            <th>Price</th>
            <th>Qun</th>
            <th>Qun (-)</th>
            <th>Qun (+)</th>
            <th>Remove</th>
          </tr>

          {
          orderedItems &&  orderedItems.map((item, index) => {

              return (
                <tr>
                  <td><img src={`http://localhost:3001/imgs/${item.image}`} alt="img" /></td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td> 
                  <td className='actionBtn' onClick={() => handleQuantityChange(item._id, 'decrease')} ><i> <IoAddCircleOutline/></i> </td>
                  <td className='actionBtn' onClick={() => handleQuantityChange(item._id, 'increase')}> <IoRemoveCircleOutline /> </td>
                  <td className='actionBtn' onClick={() => handleRemoveFromCart(item._id)} > <MdDelete/> </td>
                </tr>
              )
            })
          }


        </table>

        {
          shippingDetails &&
          <div className="shipping-address">
            <li>Name: {shippingDetails.fullname}</li>
            <li>Phone: {shippingDetails.phone}</li>
            <li>Country: {shippingDetails.country}</li>
            <li>State: {shippingDetails.state}</li>
            <li>City: {shippingDetails.city}</li>
            <li>Pincode: {shippingDetails.pincode}</li>
            <li>Address: {shippingDetails.address}</li>

          </div>
        }
     
     

      </div>
      <div className="amount">

      <p>Amount: {totalPrice}₹</p>
      </div>
      <button className='pay-btn' onClick={handlePayment}> <SiRazorpay/> Pay Now </button>
    </div>
  )
}

export default OrderSummary
