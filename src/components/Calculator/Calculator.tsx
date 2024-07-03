'use client'

import styles from './Calculator.module.css';
import { styled } from '@mui/system';
import { Htag, P } from '..';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Image from 'next/image';

const StyledSlider = styled(Slider)(({ theme }) => ({
	color: '#754B1E',
	'& .MuiSlider-thumb': {
		backgroundColor: '#754B1E',
		'&:hover, &.Mui-focusVisible, &.Mui-active': {
			boxShadow: '0 0 0 4px rgba(117, 75, 30, 0.42)',
		},
	},
	'& .MuiSlider-track': {
		backgroundColor: '#754B1E',
	},
	'& .MuiSlider-rail': {
		backgroundColor: '#D3D3D3',
	},
}));

export const Calculator = (): JSX.Element => {
	const [income, setIncome] = useState<number>(100000);
	const [value, setValue] = useState<number>(3600000);
	const [value2, setValue2] = useState<number>(400000);

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number);
	};

	const handleSliderChange2 = (event: Event, newValue: number | number[]) => {
		setValue2(newValue as number);
	};

	return (
		<div className={styles.calculator_cont}>
			<div className={styles.calculator}>
				<Htag tag='h1' className={styles.big_header}>
					От {income.toLocaleString('ru-RU')} руб.
				</Htag>
				<div className={styles.ml}>
					<P size='large'>Товарооборот в месяц, руб.</P>
					<Htag tag="h1">{value.toLocaleString('ru-RU')}</Htag>
				</div>
				<StyledSlider
					value={value}
					onChange={handleSliderChange}
					aria-labelledby="number-slider"
					size='medium'
					step={100000}
					min={3600000}
					max={10000000}
				/>
				<div className={styles.slider_interval}>
					<P size='small'>3 600 000</P>
					<P size='small'>10 000 000</P>
				</div>
				<div className={styles.ml}>
					<P size='large'>Аренда в месяц, руб.</P>
					<Htag tag="h1">{value2.toLocaleString('ru-RU')}</Htag>
				</div>
				<StyledSlider
					value={value2}
					onChange={handleSliderChange2}
					aria-labelledby="number-slider"
					size='medium'
					step={50000}
					min={100000}
					max={1000000}
				/>
				<div className={styles.slider_interval}>
					<P size='small'>100 000</P>
					<P size='small'>1 000 000</P>
				</div>
			</div>
			<div className={styles.image_cont}>
				<Image width={300} height={500} alt='Фото' src='/img/banner-img.jpeg' className={styles.banner} />
			</div>
		</div>
	);
}