import React from 'react';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import './Section.css';

export default function Section({ title, items, onCardClick }) {
    return (
        <div className="section">
            <h2>{title}</h2>

            <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={16}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
            >
                {items.map(item => (
                    <SwiperSlide key={item.id}>
                        <Card {...item} onClick={() => onCardClick(item.id)} />
                    </SwiperSlide>
                ))}

                {/* Nếu bạn muốn custom next/prev */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-pagination"></div>
            </Swiper>
        </div>
    );
}
