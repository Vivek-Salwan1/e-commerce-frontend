import React, { useEffect, useState } from 'react'
import '../styles/admin.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function EditProduct() {
    const navigate = useNavigate()
    const { productID } = useParams();
    // const [product, setProduct] = useState({}) 

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(Number);
    const [category, setCategory] = useState('Mobiles');
    const [image, setImage] = useState('');


    useEffect(() => {

        axios.get('https://e-commerce-backend-5blo.onrender.com/get-productByID/' + productID)
            .then(resp => {
                setTitle(resp.data.title)
                setDesc(resp.data.desc)
                setCategory(resp.data.category)
                setPrice(resp.data.price)
                setImage(resp.data.image)
            })
            .catch(err => console.log(err))
    }, [productID])


    const handleEdit = (e) => {
        e.preventDefault()

        axios.put('https://e-commerce-backend-5blo.onrender.com/edit-product', {productID, title, desc, category, price, image })
            .then(resp => {
                if (resp.data == 'updated') {
                    navigate('/products')
                } else {
                    console.log('updation failed')
                }
            })


    }


    return (
        <div className='edit-product-page'>

            <form onSubmit={handleEdit}>
                <h2>Edit Product</h2>


                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name='description' value={desc} onChange={e => setDesc(e.target.value)} ></textarea>
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name='price' value={price} onChange={e => setPrice(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" name='category' value={category} onChange={e => setCategory(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="imgUrl">ImgURL</label>
                    <input type="text" name='imgUrl' value={image} onChange={e => setImage(e.target.value)} />
                </div>

                <input type="submit" value='Update' />
            </form>

        </div>
    )
}

export default EditProduct
