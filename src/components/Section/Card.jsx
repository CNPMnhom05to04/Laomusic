import React from 'react';
import './Card.css';
import useDynamicImage from '../../hooks/useDynamicImage';


export default function Card({ image, name, subtitle }) {
    const imageSrc = useDynamicImage(image);
    return (
        console.log(image, name, subtitle),
        <div className="card">
            {imageSrc
                ? <img src={imageSrc} /> : <img src={image} />
            } /
            <div className="info">
                <p className="name">{name}</p>
                {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
        </div>
    );
}