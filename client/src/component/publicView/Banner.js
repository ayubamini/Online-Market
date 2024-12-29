import React, { useState, useEffect } from 'react';
import {
    banner1,
    banner2
} from "../../image"

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { url: banner1 },
        { url: banner2 }
    ];

    const nextSlide = (offset) => {
        const newSlideIndex = (currentSlide + offset + slides.length) % slides.length;
        setCurrentSlide(newSlideIndex);
    };

    const setSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change silde showing time here

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="overflow-hidden w-100 m-0 position-relative banner-slider">
            {slides.map((slide, index) => (
                <div className={`mySlides fade ${index === currentSlide ? 'display' : ''}`} key={index}>
                    <div className="numbertext">{index + 1} / {slides.length}</div>
                    <img src={slide.url} alt={`Banner ${index + 1}`} className='w-100' />
                </div>
            ))}

            {/* Previous and Next buttons */}
            <a className="carousel-button position-absolute top-50 p-4 text-white fw-bold rounded-end translate-middle-y"
                onClick={() => nextSlide(-1)}>❮</a>
            <a className="carousel-button position-absolute end-0 top-50 p-4 text-white fw-bold rounded-start translate-middle-y"
                onClick={() => nextSlide(1)}>❯</a>

            {/* dots */}
            <div className="text-center w-100 px-3 py-2 position-absolute bottom-0">
                {slides.map((_, index) => (
                    <span className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setSlide(index)} key={index}></span>
                ))}
            </div>
        </section>
    );
};

export default Banner;