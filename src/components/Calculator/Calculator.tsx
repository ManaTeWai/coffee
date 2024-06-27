'use client'

import styles from './Calculator.module.css';
import { Htag, P } from '..';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Image from 'next/image';
import useStyles from '@/utils/TextStyles';

export const Calculator = () => {
	const [income, setIncome] = useState(100000);

	const [value, setValue] = useState<number>(3600000);

	const classes = useStyles(); 

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number);
	};

	return (
		<div className={styles.calculator_cont}>
			<div className={styles.calculator}>
				<Htag tag='h1' className={styles.big_header}>Зарабатывайте до {income} руб.</Htag>
				<Htag tag='h3'>
					Значение: {value.toLocaleString('ru-RU')}
				</Htag>
				<Slider
					value={value}
					onChange={handleSliderChange}
					aria-labelledby="number-slider"
					size='medium'
					step={100000}
					min={3600000}
					max={10000000}
					className={classes.slider}
				/>
				<div className={styles.slider_interval}>
					<P size='small'>3 600 000</P>
					<P size='small'>10 000 000</P>
				</div>
				<Htag tag='h1'>тег</Htag>
			</div>
			<div className={styles.image_cont}>
				<Image width={300} height={500} alt='Фото' src='/img/banner-img.jpeg' className={styles.banner}/>
			</div>
		</div>
	)
}