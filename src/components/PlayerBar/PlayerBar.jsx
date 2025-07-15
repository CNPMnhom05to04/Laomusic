import React from 'react';
import './PlayerBar.css';

export default function PlayerBar() {
    return (
        <div className="playerbar">
            <div className="track-info">
                <img src="/cover1.jpg" alt="cover" />
                <div>
                    <p>Chúng Ta Của Hiện Tại</p>
                    <p className="artist">Sơn Tùng M-TP</p>
                </div>
            </div>
            <div className="controls">
                <button>⏮️</button>
                <button>⏯️</button>
                <button>⏭️</button>
            </div>
            <div className="progress">
                <span>0:00</span>
                <input type="range" />
                <span>5:01</span>
            </div>
        </div>
    );
}