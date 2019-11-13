import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Artist = (props) => {
    const [albums, setAlbums] = useState(null)
    const getAlbums = async() =>{
        // setAlbums(null)
        const id = props.artist.artist.artist_id
        console.log(id)
        const response = await axios.get(`https://api.musixmatch.com/ws/1.1/artist.albums.get?format=jsonp&callback=callback&artist_id=${id}&apikey=7dcaad80498084fb522add766932c1fc`)
        .then((res) =>{
            const firstStep = res.data.split('callback(')[1];
            const secondStep = firstStep.split(');')[0];
            console.log(secondStep)
            const final = JSON.parse(secondStep);
            setAlbums(final)
        })
    }

    const showAlbums = () => {
        return albums.message.body.album_list.map((album, index)=>{
            return(
                <h3 key={index}>{album.album.album_name}</h3>
            )
        })
    }
    return(
        <>
            <h1>{props.artist.artist.artist_name}</h1>
            <p>{props.artist.artist.artist_rating}</p>
            <button onClick={getAlbums}>Show Albums</button>
            {albums ? showAlbums() : null}
        </>
    )
}

export default Artist;