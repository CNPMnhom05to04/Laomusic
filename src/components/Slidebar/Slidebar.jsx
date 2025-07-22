// Install dependencies:
// npm install lucide-react

// src/components/SlideBar/SlideBar.jsx
import React, { useRef, useEffect, useState } from 'react';
import './slidebar.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Card from '../Section/Card';

export default function SlideBar({ items }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Update scroll button visibility
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (!container) return;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft + container.clientWidth < container.scrollWidth
        );
    };

    useEffect(() => {
        updateScrollButtons();
        const container = scrollRef.current;
        container.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);
        return () => {
            container.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, []);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.clientWidth * 0.8;
        const target =
            direction === 'left'
                ? Math.max(0, container.scrollLeft - scrollAmount)
                : Math.min(
                    container.scrollWidth - container.clientWidth,
                    container.scrollLeft + scrollAmount
                );
        container.scrollTo({ left: target, behavior: 'smooth' });
    };

    return (
        <div className="slidebar-wrapper">
            {canScrollLeft && (
                <button
                    className="slidebar-nav slidebar-nav--left"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ArrowLeft size={24} />
                </button>
            )}
            <div className="slidebar" ref={scrollRef}>
                {items.map(item => (
                    <div key={item.id} className="slidebar-item">
                        <Card
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            subtitle={item.subtitle}
                        />
                    </div>
                ))}
            </div>
            {canScrollRight && (
                <button
                    className="slidebar-nav slidebar-nav--right"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ArrowRight size={24} />
                </button>
            )}
        </div>
    );
}