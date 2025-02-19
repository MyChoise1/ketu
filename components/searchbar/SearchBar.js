'use client'
import React, { useState } from 'react'
import './SearchBar.css'
import useFetchProducts from '../fetch/useFetchProducts'
// import Search from '@/public/assets/img/svg/search'

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState('')
    const {products, error} = useFetchProducts()

    const fetchData = (value) => {
        if (error) {
            console.error(error)
        }
        const results = products.filter((product) => {
            return value && product && product.name && product.name.toLowerCase().includes(value.toLowerCase())
        })
        setResults(results)
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className='input-wrapper'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#1c22da" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg>
            <input type='text' placeholder='Search Here...' value={input}
                onChange={e => handleChange(e.target.value)} ></input>
        </div>
    )
}

export default SearchBar
