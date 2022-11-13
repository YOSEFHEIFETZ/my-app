import React, { useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const user = localStorage.getItem('name')
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    const links = ['info', 'todos', "posts", "albums"]
    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        localStorage.removeItem("userId");

    }
    return (
        <div >
            <nav>
                {links.map((link) => (
                    <NavLink
                        style={({ isActive }) => {
                            return {
                                textDecoration: 'none',
                                flexDirection: "row",
                                margin: "1rem 0",
                                color: isActive ? "red" : "blue",
                            };
                        }}
                        to={`${link}`}
                        key={link}>
                        {link}
                    </NavLink>

                ))}
                <Link onClick={logout} to={'login'}>logout</Link>
            </nav>
            <div>
                <h3> hello {user}</h3>
            </div>
            <div>
                <Outlet />
            </div>
        </div >
    )
}
export default Home