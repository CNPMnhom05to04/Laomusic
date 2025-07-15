import React from 'react';
import SearchBar from './SearchBar';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <SearchBar />
            <div className="actions">
                <button className="icon-btn">⚙️</button>
                <button className="btn-login">Đăng nhập</button>
            </div>
        </header>
    );
}