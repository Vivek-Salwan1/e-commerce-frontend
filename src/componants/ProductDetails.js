import React, { useContext, useEffect, useState } from 'react'
import '../styles/productDetails.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { userContext } from '../App';

function ProductDetails() {
    const navigate = useNavigate()
    const user = useContext(userContext)
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);


    const { productID } = useParams();



    useEffect(()=>{
  
        axios.get('http://localhost:3001/get-productByID/' + productID,)
        .then(resp => setProduct(resp.data))
        .catch(err => console.log(err))

    },[productID])

     useEffect(()=>{
        axios.get('http://localhost:3001/get-related-products', {params: product} )
        .then(resp => setRelatedProducts(resp.data))
        .catch(err => console.log(err))

     },[product])



    const handleAddToCart = () => {

        const item = product

        const itemWithQuantity = {
            ...item, // spread the existing item properties
            quantity: 1 // add the quantity property
        };

        axios.post('http://localhost:3001/add-to-cart', { userEmail: user.email, item: itemWithQuantity })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }

    const handleDelete = (productID) => {

        axios.delete('http://localhost:3001/delete-product/' + productID)
            .then(resp => {
                if (resp.data == 'deleted') {
                    navigate('/products')
                } else {
                    console.log('failed deleting product')
                }
            })
    }


    return (
        <div className='product-details-page'>
            {
                product &&
                <div className="product-part">
                    <div className="image">
                        <img src={`http://localhost:3001/imgs/${product.image}`} alt="img" />
                    </div>
                    <div className="product-information">
                        <h3>{product.title}</h3>
                        <p> {product.desc}   </p>
                        <p>Price : {product.price}₹</p>
                        <div className="actions">
                            {
                                user && user.name == 'admin' ?
                                    <div>
                                        <Link to={`/edit-product/${product._id}`}><button>Edit</button> </Link>

                                        <button onClick={() => handleDelete(product._id)}>Delete</button>  <br />
                                    </div>
                                    :
                                    ''
                            }


                            {/* <button>Buy now</button> */}
                            <button onClick={handleAddToCart} >Add to Cart</button>
                        </div>
                    </div>

                </div>
            }


            <div className="releted-products">

                <h1>Related Products</h1>

                {

                    relatedProducts && relatedProducts.map((item, index)=>{

                        return(
                            <div className="product-card">
                            <div className="image">
                                <img src={`http://localhost:3001/imgs/${item.image}`} alt="" srcset="" />
                            </div>
                            <p>{item.title}</p>
                            <div className="actions">
                                <li>{item.price} </li>
                                <li>Add To Cart</li>
                            </div>
        
                        </div>

                        )
                    })
                }
            </div>

        </div>
    )
}

export default ProductDetails
