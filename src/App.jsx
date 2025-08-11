// App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Section from './components/Section/Section';
import PlayerBar from './components/PlayerBar/PlayerBar';
import musicData from './data/musicdata.json';
import './App.css'; // Import your main CSS file
export default function App() {
    const sections = musicData.sections;
    const tracks = sections.flatMap(sec => sec.items);
    const [currentTrackId, setCurrentTrackId] = useState(null);
    const handleCardClick = React.useCallback(id => {
        setCurrentTrackId(id);
    });
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-area">
                <Header />
                <main>
                    {sections.map((sec, i) => (
                        <Section
                            key={i}
                            title={sec.title}
                            items={sec.items}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </main>
            </div>
            <PlayerBar trackId={currentTrackId} tracks={tracks} />
        </div>
    );
}
