import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const Album = () => {

    const { albumId } = useParams()
    const [album, setAlbum] = useState([])
    const [photos, setPhotos] = useState([])
    const [showPhotos, setShowPhotos] = useState('')

    async function getAlbumFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
            const data = await res.json()
            setAlbum(data)
        } catch (error) {
            alert(error, "network error")
        }
    }

    async function getPhotosFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            const data = await res.json()
            setPhotos(data)
        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getAlbumFromApi()
        getPhotosFromApi()
        return () => {
            clearInterval(interval)
        }
    }, [albumId])

    let num = 0
    const updateHandler = () => {
        setShowPhotos(photos[num].thumbnailUrl)
        if (num === photos.length - 1) {
            num = 0
        } num++
    }

    let interval;
    useEffect(() => {
        if (photos.length) {
            interval = setInterval(updateHandler, 2000);
        }
    }, [photos]);

    return (
        <div>
            <table id="customers">
                <thead>
                    <tr>
                        <th>album</th>
                    </tr>
                </thead>
                <tbody>
                    {album && <tr><td>{album.title}</td></tr>}
                </tbody>
            </table>
            <br />
            <div>
                {showPhotos ? <img src={showPhotos} /> : "loding photos"}
            </div>
        </div>
    )
}
export default Album