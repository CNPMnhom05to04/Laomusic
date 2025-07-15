import React from 'react';
import './Sidebar.css';
import Logo from '../../assests/picture/logo.png';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="logo">
                <img src={Logo} alt="Laomusic" />

            </div>
            <nav>
                <ul>
                    <li>Trang chủ</li>
                    <li>Bảng xếp hạng</li>
                    <li>Chủ đề và thể loại</li>
                    <li>Thư viện</li>
                </ul>
            </nav>
        </aside>
    );
}