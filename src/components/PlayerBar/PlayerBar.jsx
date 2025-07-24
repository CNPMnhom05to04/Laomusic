import React, { useEffect, useRef, useState } from 'react';
import './PlayerBar.css';
import { getDynamicAudio } from '../../utils/getDynamicAudio';

export default function PlayerBar({ trackId, tracks }) {
    const audioRef = useRef(new Audio());
    const [trackInfo, setTrackInfo] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Format thời gian thành MM:SS
    const formatTime = seconds => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${String(s).padStart(2, '0')}`;
    };

    // Hàm load và play track
    const loadAndPlay = id => {
        const track = tracks.find(t => t.id === id);
        if (!track) return;
        const audioUrl = getDynamicAudio(track.url);
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setTrackInfo(track);
    };

    // Khi prop trackId thay đổi
    useEffect(() => {
        if (trackId != null) {
            loadAndPlay(trackId);
        }
    }, [trackId, tracks]);

    // Cài đặt listener để cập nhật progress
    useEffect(() => {
        const audio = audioRef.current;
        const onLoaded = () => setDuration(audio.duration);
        const onTimeUpdate = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadedmetadata', onLoaded);
        audio.addEventListener('timeupdate', onTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, []);

    // Xử lý restart bài (⏮️)
    const handleRestart = () => {
        if (trackInfo) {
            audioRef.current.currentTime = 0;
            if (trackInfo.id + 1 >= tracks.length)
                loadAndPlay(1);
            if (trackInfo.id + 1 < tracks.length)
                loadAndPlay(trackInfo.id + 1);

        }
    };

    // Xử lý pause và play
    const handlePause = () => audioRef.current.pause();
    const handlePlay = () => audioRef.current.play();

    return (
        <div className="playerbar">
            {trackInfo ? (
                <>
                    <div className="track-info">
                        <img
                            src={trackInfo.cover || '/cover-default.jpg'}
                            alt="cover"
                        />
                        <div>
                            <p>{trackInfo.name}</p>
                            <p className="artist">{trackInfo.subtitle}</p>
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={handlePause}>⏸️</button>
                        <button onClick={handlePlay}>▶️</button>
                        <button onClick={handleRestart}>⏮️</button>
                    </div>

                    <div className="progress">
                        <span>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            step="0.01"
                            onChange={e => {
                                const t = Number(e.target.value);
                                audioRef.current.currentTime = t;
                                setCurrentTime(t);
                            }}
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </>
            ) : (
                <p>Chưa có bài hát nào được chọn</p>
            )}
        </div>
    );
}
