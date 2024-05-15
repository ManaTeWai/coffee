'use client'

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Slider.module.css';
import Image from 'next/image';
import { Htag, P } from '../';

type Slide = {
	imageUrl: string;
	title: string;
	text: string;
};

type SliderProps = {
	slides: Slide[];
};

export const Slider = ({ slides, ...props }: SliderProps): JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
	}, [slides.length]);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
	}, [slides.length]);

	useEffect(() => {
		const interval = setInterval(nextSlide, 5000);
		return () => clearInterval(interval);
	}, [nextSlide]);

	return (
		<div className={styles.slider}>
			<button onClick={prevSlide} className={styles.arrowLeft}>
				&#10094;
			</button>
			<div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{slides.map((slide, index) => (
					<div className={styles.slide} key={index}>
						<Image src={slide.imageUrl} alt={slide.title} className={styles.image} width={100} height={100}/>
						<Htag tag='h2'>{slide.title}</Htag>
						<P size='medium' className={styles.text}>{slide.text}</P>
					</div>
				))}
			</div>
			<button onClick={nextSlide} className={styles.arrowRight}>
				&#10095;
			</button>
		</div>
	);
};

export default Slider;
