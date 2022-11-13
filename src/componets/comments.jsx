import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const Comments = () => {
    const { postId } = useParams()
    const [comments, setComments] = useState()

    async function getUsersFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            const data = await res.json()
            setComments(data)
            console.log(data);

        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getUsersFromApi()
    }, [])

    return (
        <div>
            <table id="customers">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>comment</th>
                    </tr>
                </thead>
                <tbody>
                    {comments && comments.map((todo, idx) =>
                        <tr key={idx}>{Object.values(todo).map((do1, idx2) => {
                            if (idx2 == 0 || idx2 == 1) {
                                return
                            }
                            else {
                                return <td key={idx2}>{do1}</td>
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
export default Comments
