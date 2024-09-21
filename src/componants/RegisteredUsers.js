import React, { useEffect, useState } from 'react'
import '../styles/admin.css'
import axios from 'axios'

function RegisteredUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get('https://e-commerce-backend-5blo.onrender.com/get-all-users')
            .then(resp => setUsers(resp.data))
            .catch(err => console.log(err))

    }, [])

    return (
        <div className='registered-users-page'>
            <h2>Registered Users</h2>

            {
                users.map((user, index) => {
                    return (
                        <div className="user">
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                            <span>{user.date}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RegisteredUsers
