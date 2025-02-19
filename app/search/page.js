'use client'
import SearchBar from '@/components/searchbar/SearchBar';
import SearchResultList from '@/components/searchbar/SearchResultList';
import React, { useState } from 'react'

const search = () => {
  const [results, setResults] = useState()
  return (
    <div className='form-container'>
      <SearchBar setResults={setResults} />
      <SearchResultList results={results} />
    </div>
  )
}

export default search;
