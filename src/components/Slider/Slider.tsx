'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';

type Slide = {
	imageUrl: string;
	title: string;
};

type SliderProps = {
	slides: Slide[];
};

export const Slider = ({ slides, ...props }: SliderProps): JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
	}, [slides.length]);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
	}, [slides.length]);

	const resetTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		timerRef.current = setInterval(nextSlide, 7000);
	}, [nextSlide]);

	useEffect(() => {
		resetTimer();
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [resetTimer]);

	const handleNextClick = () => {
		nextSlide();
		resetTimer();
	};

	const handlePrevClick = () => {
		prevSlide();
		resetTimer();
	};

	return (
		<div className={styles.slider}>
			<button onClick={handlePrevClick} className={styles.arrowLeft}>
				<span>&#10094;</span>
			</button>
			<div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{slides.map((slide, index) => (
					<div className={styles.slide} key={index}>
						<Image src={slide.imageUrl} alt={slide.title} className={styles.image} fill style={{objectFit: 'cover'}} />
					</div>
				))}
			</div>
			<button onClick={handleNextClick} className={styles.arrowRight}>
				<span>&#10095;</span>
			</button>
			<div className={styles.indicator}>
				{currentIndex + 1} / {slides.length}
			</div>
		</div>
	);
};

export default Slider;
