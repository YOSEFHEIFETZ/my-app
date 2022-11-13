import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Albums = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const [albums, setAlbums] = useState([])

    async function getUsersFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
            const data = await res.json()
            setAlbums(data)

        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getUsersFromApi()
    }, [])

    const goToAlbum = (album) => {
        navigate(`album/${album.id}`)
    }

    const albumsFilter = () => {
        let sortedAlbums = [...albums]
        sortedAlbums.sort((x, y) => {
            if (x.title > y.title) {
                return 1
            } else if (x.title < y.title) {
                return -1
            } else {
                return 0
            }
        })
        return sortedAlbums
    }

    return (
        <div>
            <p> click on a album</p>
            <table id="customers">
                <thead>
                    <tr>
                        <th>albums</th>
                    </tr>
                </thead>
                <tbody>
                    {albums && albumsFilter().map((album, idx) =>
                        <tr key={idx}>
                            <td onClick={() => goToAlbum(album)}>{album.title}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Albums