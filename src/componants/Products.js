import React, { useContext, useEffect, useState } from 'react'
import '../styles/products.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { userContext } from '../App'

function Products() {
    const user = useContext(userContext);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([])

    useEffect(() => {

        axios.get('https://e-commerce-backend-5blo.onrender.com/get-products')
            .then(resp => {
                setAllProducts(resp.data)
                setProducts(resp.data)
            })
            .catch(err => console.log(err))

    }, [])

    const handleAddToCart = (productID) => {

        const item = products.find(item => item._id === productID)

        // item.push quantity = 1
        const itemWithQuantity = {
            ...item, // spread the existing item properties
            quantity: 1 // add the quantity property
        };

        console.log('item in product', itemWithQuantity)

        axios.post('https://e-commerce-backend-5blo.onrender.com/add-to-cart', { userEmail: user.email, item: itemWithQuantity })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }

    const handleFilter = (value) => {

        // console.log('value is ', value)

        if (value == 'No filter') {
            setProducts(allProducts)
        } else if (!isNaN(value)) {
            const filteredProducts = allProducts.filter(items => items.price <= parseInt(value))
            setProducts(filteredProducts)

        }
        else {

            const filteredProducts = allProducts.filter(items => items.category == value);
            setProducts(filteredProducts)
        }
    }

    return (
        <div className='products-page'>

            <div className="filters">
                <li onClick={() => handleFilter('No filter')}>No Filter</li>
                <li onClick={() => handleFilter('Mobiles')}>Mobiles</li>
                <li onClick={() => handleFilter('Tablets')}>Tablets</li>
                <li onClick={() => handleFilter('Camera')}>Camera's</li>
                <li onClick={() => handleFilter('Headphones')}>Headphones</li>
                <li onClick={() => handleFilter(1000)}>1,000</li>
                <li onClick={() => handleFilter(5000)}>5,000</li>
                <li onClick={() => handleFilter(10000)}>10,000</li>
                <li onClick={() => handleFilter(30000)}>30,000</li>

            </div>

            <div className="products">

                {
                    products && products.map((product, index) => {
                        return (
                            <div key={index} className="product-card">
                                <Link to={`/product-details/${product._id}`}>
                                    <div className="image">
                                        <img src={`https://e-commerce-backend-5blo.onrender.com/imgs/${product.image}`} alt="img" />
                                    </div>
                                    <p>{product.title}</p>
                                </Link>
                                <div className="actions">
                                    <li className='price'>Price: {product.price}₹</li>
                                    <li className='addtocart' onClick={() => handleAddToCart(product._id)} >Add To Cart</li>
                                </div>

                            </div>


                        )
                    })

                }



            </div>

        </div>
    )
}

export default Products
