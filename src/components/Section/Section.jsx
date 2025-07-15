import React from 'react';
import Card from './Card';
import './Section.css';

export default function Section({ title, items }) {
    return (
        <section className="section">
            <h2>{title}</h2>
            <div className="cards">
                {items.map((item, idx) => (
                    <Card key={idx} {...item} />
                ))}
            </div>
        </section>
    );
}