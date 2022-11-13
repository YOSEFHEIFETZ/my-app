import React, { useState, useEffect } from 'react';

const Info = () => {
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState({})

    async function getUsersFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            const data = await res.json()
            setUser(data)
        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getUsersFromApi()
    }, [userId])

    const { name, phone, website, email } = user

    return ( 
        <div>
            {user.address && <table id="customers">
                <tbody>
                    <tr><th>name</th><td>{name}</td></tr>
                    <tr ><th>addres</th>
                        <tr><th style={{ backgroundColor: "lightblue"}}>street:</th> <td >{user.address.street}</td></tr>
                        <tr><th style={{ backgroundColor: "lightblue" }}>suite:</th><td>{user.address.suite}</td></tr>
                        <tr><th style={{ backgroundColor: "lightblue" }}>city:</th><td>{user.address.city}</td></tr>
                    </tr>
                    <tr><th>phone</th><td>{phone}</td></tr>
                    <tr><th>website</th><td>{website}</td></tr>
                    <tr><th>email</th><td>{email}</td></tr>
                </tbody>
            </table>}
        </div>
    )
}
export default Info
