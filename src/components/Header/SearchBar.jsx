import React from 'react';
import './SearchBar.css';

export default function SearchBar() {
    return (
        <div className="searchbar">
            <input type="text" placeholder="Bạn muốn nghe gì" />
        </div>
    );
}