import React, {useState, useEffect} from 'react'
import useForm from 'react-hook-form'
import styled from 'styled-components'
import axios from 'axios'
// import axios from 'axios-jsonp-pro'
import Artist from './Artist';

const SearchForm = styled.form`
    border-radius: 15px;
    background-color: lightgray;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    width: 30%;
`;

const SearchIcon = styled.img`

    width: 15px;
    height: 15px;
`

const SearchButton = styled.button`
    border: none;
    background-color: lightgray;
    opacity: 0.3;
`

const InputText = styled.input`
    border: none;
    background-color: lightgray;
    font-family: 'Nunito', sans-serif;
    font-size: 1.1rem;
    color: #24292E;
`


const SearchBar = (props) => {
    const [result, updateResult] = useState(null);
    const { handleSubmit, register} = useForm();
    const onSubmit = async (values) => {
        updateResult(null);
        const artistQuery = values.searchQuery;
        const splitResponse = await axios.get(`https://api.musixmatch.com/ws/1.1/artist.search?format=jsonp&callback=callback&q_artist=${artistQuery}&page_size=5&apikey=7dcaad80498084fb522add766932c1fc
        `)
        .then((res) =>{
            const firstStep = res.data.split('callback(')[1];
            const secondStep = firstStep.split(')')[0];
            const final = JSON.parse(secondStep);
            console.log(final)
            updateResult(final)
        })
    }
    const showAlbums = async() => {

    }
    const showResult = () =>{
        
        return result.message.body.artist_list.map((artist, index) => {
            return(
                <Artist key={index} artist={artist}/>
            )
        })
    }

    return(
        <>
            <SearchForm onSubmit={handleSubmit(onSubmit)}>
                <InputText placeholder="Enter An Artists Name"type="text" name="searchQuery" id="searchQuery" ref={register({required: 'Required'})}/> 
                <SearchButton type="submit">
                    <SearchIcon src={require('../search.svg')} alt="Search Icon">
                    </SearchIcon> 
                </SearchButton>
            </SearchForm>
            {result ?  showResult() : null}
        </>

    )
}

export default SearchBar