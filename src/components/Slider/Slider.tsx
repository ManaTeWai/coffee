'use client';

import React, { useState, useEffect, useCallback, useRef, type JSX } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';

type Slide = {
	imageUrl: string;
	title: string;
};

type SliderProps = {
	slides: Slide[];
	slides_mobile: Slide[];
};

export const Slider = ({ slides, slides_mobile, ...props }: SliderProps): JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);

		return () => {
			window.removeEventListener('resize', checkIsMobile);
		};
	}, []);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => {
			const slidesArray = isMobile ? slides_mobile : slides;
			return (prevIndex + 1) % slidesArray.length;
		});
	}, [slides, slides_mobile, isMobile]);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => {
			const slidesArray = isMobile ? slides_mobile : slides;
			return (prevIndex - 1 + slidesArray.length) % slidesArray.length;
		});
	}, [slides, slides_mobile, isMobile]);

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

	const currentSlides = isMobile ? slides_mobile : slides;

	return (
		<div className={styles.slider}>
			<button onClick={handlePrevClick} className={styles.arrowLeft}>
				<span>&#10094;</span>
			</button>
			<div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{currentSlides.map((slide, index) => (
					<div className={styles.slide} key={index}>
						<Image
							src={slide.imageUrl}
							alt={slide.title}
							className={styles.image}
							fill
							style={{ objectFit: 'fill' }}
						/>
					</div>
				))}
			</div>
			<button onClick={handleNextClick} className={styles.arrowRight}>
				<span>&#10095;</span>
			</button>
			<div className={styles.indicator}>
				{currentIndex + 1} / {currentSlides.length}
			</div>
		</div>
	);
};

export default Slider;
