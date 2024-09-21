import React, { useState } from 'react'
import '../styles/admin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProduct() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(Number);
    const [category, setCategory] = useState('Mobiles');
    const [image, setImage] = useState('');



    
    const handleAddProduct = (e)=>{
       e.preventDefault();
        const formData = new FormData();

        formData.append('title', title)
        formData.append('desc', desc)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('image', image)

       axios.post('https://e-commerce-backend-5blo.onrender.com/add-product', formData)
       .then(resp => navigate('/products'))
       .catch(err => console.log(err))
    }


    return (
        <div className='edit-product-page'>

            <form onSubmit={handleAddProduct}>
                <h2>Add Product</h2>


                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' onChange={e =>setTitle(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name='desc' onChange={e =>setDesc(e.target.value)} ></textarea>
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name='price' onChange={e =>setPrice(Number(e.target.value))} />
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="" onChange={e =>setCategory(e.target.value)} >
                        <option value="Moblies">Moblies</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Camera">Camera</option>
                        <option value="Headphones">Headphones</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="imgUrl">Image</label>
                    <input type="file" name='file' onChange={e =>setImage(e.target.files[0])} />
                </div>

                <input type="submit"  value='Submit'/>
            </form>

        </div>
    )
}

export default EditProduct
