import React, { useContext, useEffect, useState } from 'react'
import '../styles/cart.css'
import axios from 'axios'
import { userContext } from '../App';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";


function Cart() {
    const user = useContext(userContext)
    const [cart, setCart] = useState([]);
    const [totalQun, setTotalQun] = useState(Number);
    const [totalBill, setTotalBill] = useState(Number);



    useEffect(() => {
        axios.get('http://localhost:3001/get-cart-items/' + user.email)
            .then(resp => setCart(resp.data.cartItems))
            .catch(err => console.log(err))
    }, [])

    const handleRemoveFromCart = (itemID) => {

        axios.delete('http://localhost:3001/remove-from-cart/', {
            params: {
                itemID: itemID,
                userEmail: user.email
            }
        }).then(resp => {
            if (resp.data == 'item-removed') {
                const updatedCart = cart.filter(item => item._id !== itemID)

                setCart(updatedCart)
            }
        })
            .catch(err => console.log(err))
    }


    const handleQuantityChange = (itemID, action) => {
        const updatedCart = cart.map(item => {
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

        setCart(updatedCart);

        // Optionally, send updated data to the server
        axios.put('http://localhost:3001/update-cart', {
            userEmail: user.email,
            updatedCart,
        }).then(resp => console.log('Cart updated'))
            .catch(err => console.log(err));
    };

    const handleClearCart = () => {

        axios.put('http://localhost:3001/clear-cart', { userEmail: user.email })
            .then(resp => {
                if (resp.data == 'cart cleared') {
                    setCart(null)
                    console.log('cart cleared')
                }
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {

        const totalQun = cart.reduce((accumulator, item) => { return accumulator + item.quantity; }, 0);
        // console.log('total qun ', totalQun)
        setTotalQun(totalQun)


        const TotalPrice = cart.reduce((accumulator, item) => { return accumulator + item.price }, 0)
        setTotalBill(TotalPrice)

    }, [cart])


    return (
        <div className='cart-page'>

            <div className="cart-information">
                <li>Total Quanity : {totalQun}</li>
                <li>Total Amount : {totalBill}₹ </li>
            </div>

            <div className="cart-items">
                {
                    cart && cart.map((item, index) => {
                        return (

                            <div className="item" key={index}>

                                <div className="item-img">
                                    <img src={`http://localhost:3001/imgs/${item.image}`} alt="img" />
                                </div>

                                <div className="item-name">
                                    <li>Product : {item.title}</li>
                                    <li>Price : {item.price}/-</li>
                                    <li>Qun : {item.quantity}</li>
                                </div>

                                <div className="item-actions">
                                    <button className='plus-minus' onClick={() => handleQuantityChange(item._id, 'decrease')} > Decrease (-)</button>
                                    <button className='plus-minus' onClick={() => handleQuantityChange(item._id, 'increase')}>  Increase (+)</button>
                                    <button className='remove-btn' onClick={() => handleRemoveFromCart(item._id)} >Remove</button>
                                </div>

                            </div>
                        )
                    })
                }



            </div>




            <div className="cart-actions">
                <Link to='/shipping'> <button> <FaShoppingCart/> Check Out</button> </Link>
                <button className='clear-cart-btn' onClick={handleClearCart}>Clear Cart</button>
            </div>

        </div>
    )
}

export default Cart
