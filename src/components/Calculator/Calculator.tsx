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

const Calculator = () => {
	const [income, setIncome] = useState<number>(100000);
	const [value, setValue] = useState<number>(3600000);

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number);
	};

	return (
		<div className={styles.calculator_cont}>
			<div className={styles.calculator}>
				<Htag tag='h1' className={styles.big_header}>
					Зарабатывайте до {income.toLocaleString('ru-RU')} руб.
				</Htag>
				<Htag tag='h3'>
					Значение: {value.toLocaleString('ru-RU')}
				</Htag>
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
				<Htag tag='h1'>тег</Htag>
			</div>
			<div className={styles.image_cont}>
				<Image width={300} height={500} alt='Фото' src='/img/banner-img.jpeg' className={styles.banner} />
			</div>
		</div>
	);
}

export default Calculator;
