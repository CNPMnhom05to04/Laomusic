import React from 'react';
import './Card.css';
import useDynamicImage from '../../hooks/useDynamicImage';
import usePlayMusic from '../../hooks/usePlayMusic';
import musicdata from '../../data/musicdata.json';
const tracks = musicdata.sections
console.log(tracks);

export default function Card({ image, name, subtitle, id }) {
    const imageSrc = useDynamicImage(image);
    const play = usePlayMusic(id, tracks);
    function handleClick() {
        console.log("Đã click vào card", id);
        play();
    }

    return (
        console.log(image, name, subtitle),
        <div className="card" onClick={handleClick}
        >
            {imageSrc
                ? <img src={imageSrc} /> :

                <
                    img src={image} />

            }
            <div className="info">
                <p className="name">{name}</p>
                {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
        </div>
    );
}