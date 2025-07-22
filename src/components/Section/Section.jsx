import React from 'react';
import Card from './Card';

export default function Section({ title, items, onCardClick }) {
    return (
        <div className="section">
            <h2>{title}</h2>
            <div className="items">
                {items.map(item => (
                    <Card
                        key={item.id}
                        {...item}
                        onClick={() => onCardClick(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}