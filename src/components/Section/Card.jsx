import React from 'react';
import './Card.css';
import useDynamicImage from '../../hooks/useDynamicImage';
const imagesContext = require.context(
    '../../assests/picture',   // thư mục
    false,
    /.(png|jpe?g|svg)$/
);

export default React.memo(function Card({ image, name, subtitle, id, onClick }) {

    console.log(111)


    const imageSrc = React.useMemo(() => {
        if (!image) {
            return '';
        }

        try {
            return imagesContext(`./${image}`);
        } catch (err) {
            console.error('Error loading image:', err);
            return '';
        }, [image]);
    return (
        <div className="card" onClick={() => {
            onClick(id);
            console.log('Card clicked:', id);
        }
        }>
            {imageSrc ? <img src={imageSrc} /> : <img src={image} />}
            <div className="info">
                <p className="name">{name}</p>
                {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
        </div>
    );
})

