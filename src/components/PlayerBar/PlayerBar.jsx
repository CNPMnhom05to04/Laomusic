import React, { useEffect, useRef, useState } from 'react';
import './PlayerBar.css';
import { getDynamicAudio } from '../../utils/getDynamicAudio';

export default function PlayerBar({ trackId, tracks }) {
    const audioRef = useRef(new Audio());
    const [trackInfo, setTrackInfo] = useState(null);

    useEffect(() => {
        if (trackId) {
            const track = tracks.find(t => t.id === trackId);
            if (track) {
                const audioUrl = getDynamicAudio(track.url);
                audioRef.current.src = audioUrl;
                audioRef.current.play();
                setTrackInfo(track);
            }
        }
    }, [trackId, tracks]);

    return (
        <div className="playerbar">
            {trackInfo ? (
                <>
                    <div className="track-info">
                        <img src={trackInfo.cover || '/cover-default.jpg'} alt="cover" />
                        <div>
                            <p>{trackInfo.name}</p>
                            <p className="artist">{trackInfo.subtitle}</p>
                        </div>
                    </div>
                    <div className="controls">
                        <button onClick={() => audioRef.current.pause()}>⏸️</button>
                        <button onClick={() => audioRef.current.play()}>▶️</button>
                        <button onClick={() => audioRef.current.currentTime = 0}>⏮️</button>
                    </div>
                    <div className="progress">
                        <span>{Math.floor(audioRef.current.currentTime / 60)}:{String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, '0')}</span>
                        <input
                            type="range"
                            min={0}
                            max={audioRef.current.duration || 0}
                            value={audioRef.current.currentTime}
                            onChange={e => audioRef.current.currentTime = e.target.value}
                        />
                        <span>{trackInfo.duration}</span>
                    </div>
                </>
            ) : (
                <p>Chưa có bài hát nào được chọn</p>
            )}
        </div>
    );
}
