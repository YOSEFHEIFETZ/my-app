import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [users, setUsers] = useState()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [notValid, setNotValid] = useState(false)

    const navigate = useNavigate()

    async function getUsersFromApi() {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            alert(error, 'netwok rerror')
        }
    }

    useEffect(() => {
        getUsersFromApi()
    }, [])

    const userIsValid = () => {
        return users.find((user) => (user.username.toLowerCase() == name.toLowerCase()) &&
            (user.address.geo.lat.slice(-4) == password))
    }

    const handelLogIn = (e) => {
        e.preventDefault()
        const isValid = userIsValid()
        if (!isValid) {
            setNotValid(true)
        } else if (isValid) {
            localStorage.setItem("username", isValid.username)
            localStorage.setItem("name", isValid.name)
            localStorage.setItem("userId", isValid.id)
            navigate('/')
        }
    }

    return (
        <div id="login">
            <h3>please login</h3>
            <div>
                <form id="customers2" onSubmit={handelLogIn}>
                    <input type='text' value={name}
                        placeholder="Enter user name"
                        onChange={(e) => setName(e.target.value)} />
                    <br />
                    <br />
                    <input type='password' value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <br /><br />
                    <button type='submit'>submit</button>
                </form>
            </div>
            {notValid && <p>user not fuond or enterd wrong password <br /> please try again</p>}
        </div>
    )
}
export default Login