import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom'
const Post = () => {

    const [post, setPost] = useState([])
    const [comments, setComments] = useState(false)
    const { postId } = useParams()

    async function getPostFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            const data = await res.json()
            setPost(data)

        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getPostFromApi()
    }, [postId])

    const navigate = useNavigate()

    const goToComments = () => {
        setComments(!comments)
        navigate(`comments`)
    }

    return (
        <div>
            <table id="customers2">
                <thead>
                    <tr>
                        <th>Post body</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{post.body}</td>
                    </tr>
                    <tr>
                        <td onClick={goToComments}>{!comments ? "click to view comments" 
                        : "click to hide comments"}</td>
                    </tr>
                </tbody>
            </table>
           {comments && <Outlet />}
        </div>
    )
}
export default Post