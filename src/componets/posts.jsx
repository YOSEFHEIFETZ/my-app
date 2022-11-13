import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'

const Posts = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const [posts, setPosts] = useState([])

    async function getUsersFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            const data = await res.json()
            setPosts(data)
        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getUsersFromApi()
    }, [userId])

    const goToPost = (post) => {
        navigate(`post/${post.id}`)
    }

    return (
        <div>
            <Outlet />
            <p> click on a posts</p>
            <table id="customers">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Post title</th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.map((post, idx) =>
                        <tr key={idx}>{Object.values(post).map((do1, idx2) => {
                            if (idx2 == 0 || idx2 == 1 || idx2 == 3) {
                                return
                            }
                            else {
                                return <React.Fragment key={idx2}><td >{idx + 1}</td>
                                    <td onClick={() => goToPost(post)}>{do1}</td></React.Fragment>
                            }
                        }
                        )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Posts