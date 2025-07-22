import React from 'react';
import './Card.css';
import useDynamicImage from '../../hooks/useDynamicImage';

export default function Card({ image, name, subtitle, id, onClick }) {
    const imageSrc = useDynamicImage(image);

    return (
        <div className="card" onClick={() => onClick(id)}>
            {imageSrc ? <img src={imageSrc} /> : <img src={image} />}
            <div className="info">
                <p className="name">{name}</p>
                {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
        </div>
    );
}

