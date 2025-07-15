import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Section from './components/Section/Section';
import PlayerBar from './components/PlayerBar/PlayerBar';
import musicData from './data/musicdata.json';
const sections = musicData.sections;
console.log(sections);

export default function App() {
    return (
        <div className="app-container">
            {<Sidebar />}
            <div className="main-area">
                <Header />
                <main>
                    {sections.map((sec, i) => (
                        <Section key={i} title={sec.title} items={sec.items} />
                    ))}
                </main>
            </div>
            <PlayerBar />
        </div>
    );

}