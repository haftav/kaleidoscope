import React from 'react';

export default function SearchBar ({ value, handleInputChange, handleClick }) {
    return (
        <div className="Waterfall_search">
            <input onChange={handleInputChange} value={value} placeholder="Search..."/>
            <button onClick={handleClick}>SEARCH</button>
        </div>
    )
}