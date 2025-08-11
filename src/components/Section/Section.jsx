import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';
import './Section.css';

export default function Section({ title, items, onCardClick }) {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1,
        }
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    return (
        <div className="section">
            <h2 className="section-title">{title}</h2>
            <Carousel
                swipeable
                draggable={false}

                infinite={false}
                keyBoardControl
                responsive={responsive}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                itemClass="carousel-item"
            >
                {items.map(item => (
                    <div key={item.id} className="carousel-item-wrapper">
                        <Card {...item} onClick={() => onCardClick(item.id)} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
