import React from 'react';

export default function SearchBar ({ value, handleInputChange }) {
    return (
        <input onChange={handleInputChange} value={value}/>
    )
}